const mssql = require('../db.js')
const { addNotification } = require('./notifyController.js')
const {checkValidId} = require('./staticFuture.js')

const getAllFilm = (req, res) => {
  const query =
    'SELECT f.id, filmName, originName, thurmUrl, posterUrl, slug, description, status, episodeCurrent, episodeTotal, released, countryName FROM film f, country c where f.country = c.id ORDER BY episodeCurrent DESC'

  mssql
    .query(query)
    .then(async (result) => {
      let films = result.recordset
      const filmsPromise = films.map((f) => {
        let queryCate =
          'SELECT categoryName FROM film_category fc, category c WHERE fc.categoryId = c.id AND fc.filmId = ' + f.id

        return mssql
          .query(queryCate)
          .then((categoriesRes) => {
            let categories = categoriesRes.recordset.map((c) => c.categoryName)
            f.slug = f.slug.trim()
            f.rated = (Math.random() * 10).toFixed(1)
            f.categories = categories
            return f
          })
          .catch((error) => {
            console.error('Error:', error.message)
          })
      })
      return Promise.all(filmsPromise)
    })
    .then((films) => res.json(films))
}

const createFilm = async (req, res) => {
  const data = req.body
  const status = data.status ? 1 : 0
  const episodeTotal = data.episodeTotal ? data.episodeTotal : null
  const categories = data.categories
  const query = `
    INSERT INTO film (
        [filmName]
        ,[originName]
        ,[status]
        ,[thurmUrl]
        ,[trailerUrl]
        ,[posterUrl]
        ,[episodeTotal]
        ,[timeUNE]
        ,[released]
        ,[viewCount]
        ,[slug]
        ,[director]
        ,[country]
        ,[part]
        ,[seriesId]
        ,[description])
    OUTPUT INSERTED.id
    VALUES (
        N'${data.filmName}', 
        N'${data.originName}', 
        ${status}, 
        '${data.thumbUrl}',
        '${data.trailerUrl}', 
        '${data.posterUrl}', 
        ${episodeTotal}, 
        N'${data.timeUNE}', 
        '${data.released}',  
        0, 
        '${data.slug}',  
        N'${data.director}', 
        ${data.country},
        N'${data.part}', 
        ${data.series},
        N'${data.description}'
    )`

  mssql
    .query(query)
    .then((result) => {
      const filmId = result.recordset[0].id;
      
      Promise.all(categories.map(async (category) => {
        await mssql.query(`INSERT INTO film_category([filmId], [categoryId]) VALUES(${filmId}, ${category})`)
      }))
      .then(() =>{
        addNotification(`${data.filmName} film`, 'was created')
  
        res.json(result.rowsAffected)
      })
      .catch(err => {
        res.json('Have an error: ' + err.message)
      })
    })
    .catch((err) => res.json('Have an error: ' + err.message))
}

const getFilmEdit = async (req, res) => {
  let id = req.query.id
  let checkResult = await checkValidId(id, 'film')
  if(checkResult === 2) {
    const query =
    'SELECT filmName, originName, status, thurmUrl, posterUrl, trailerUrl, episodeCurrent, episodeTotal, timeUNE, released, director , country , part, seriesId, description  FROM film  where id = ' +
    id
    const queryCate =
      'SELECT categoryName FROM film_category fc, category c WHERE fc.categoryId = c.id AND fc.filmId = ' + id
    const queryGetSeriId = 'SELECT seriesId FROM film WHERE id = ' + id

    mssql.query(queryGetSeriId)
      .then((seriId) => seriId.recordset[0].seriesId)
      .then((seriId) => {
        const querySeries = `SELECT id, part FROM film WHERE seriesId = ${seriId} ORDER BY released`

        mssql.query(querySeries)
          .then((seriesRes) => seriesRes.recordset)
          .then((series) => {
            mssql
              .query(queryCate)
              .then((categoriesRes) => {
                let categories = categoriesRes.recordset.map((c) => c.categoryName)
                return {
                  series,
                  categories
                }
              })
              .then((data) => {
                mssql.query(query).then((result) => {
                  let film = result.recordset[0]
                  film.categories = data.categories
                  film.series = data.series
                  res.json(film)
                })
              })
              .catch((err) => res.json('Have an error: ' + err.message))
          })
      })
  }
  else if(checkResult === 1 ) {
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('Id not exists')
      }
  else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Id not valid')
  }
}

const updateFilm = async (req, res) => {
  const data = req.body
  const status = data.status ? 1 : 0
  const episodeTotal = data.episodeTotal ? data.episodeTotal : null
  const categories = data.categories
  const query = `UPDATE [dbo].[film]
    SET [filmName] = N'${data.filmName}'
       ,[originName] = N'${data.originName}'
       ,[status] = ${status}
       ,[thurmUrl] = '${data.thumbUrl}'
       ,[trailerUrl] = '${data.trailerUrl}'
       ,[posterUrl] = '${data.posterUrl}'
       ,[episodeTotal] = ${episodeTotal}
       ,[timeUNE] = N'${data.timeUNE}'
       ,[released] = '${data.released}'
       ,[slug] = '${data.slug}'
       ,[director] = N'${data.director}'
       ,[part] = N'${data.part}'
       ,[seriesId] = ${data.series}
       ,[country] = ${data.country}
       ,[description] = N'${data.description}'
  WHERE id=${data.id}`

  const queryCF =  `SELECT categoryId FROM film_category WHERE filmId = ${data.id}`
  mssql
    .query(queryCF)
    .then(async (result) => {
      const resultId = result.recordset.map(c => c.categoryId)

      const categoriesToRemove = resultId.filter(c => !categories.includes(c))
      const categoriesToAdd = categories.filter(c => !resultId.includes(c))
      
      if(categoriesToRemove.length > 0) {
        const removeQuery = `DELETE FROM film_category WHERE filmId = ${data.id} AND categoryId IN (${categoriesToRemove.join(
          ","
        )})`;
        await mssql.query(removeQuery);
      }

      if(categoriesToAdd.length > 0) {
        const addQuery = `INSERT INTO film_category (filmId, categoryId) VALUES ${categoriesToAdd.map((category) => `(${data.id}, ${category})`).join(", ")}`;
        await mssql.query(addQuery);
      }
    })
    .catch((err) => res.json('Have an error: ' + err.message))

  mssql
    .query(query)
    .then((result) => {
      addNotification(`Film ${data.filmName}`, 'was updated')
      res.json(result.rowsAffected)
    })
    .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteFilm = async (req, res) => {
  let id = req.query.id
  let checkResult = await checkValidId(id, 'film')
  if(checkResult === 2) {
    const queryCF =  `DELETE FROM film_category WHERE filmId = ${id}`
    const query = `DELETE FROM film WHERE id = ${id}`

    mssql
      .query(queryCF)
      .then((result) => {
        mssql
        .query(query)
        .then((result) => {
          addNotification('A film', 'was deleted')
          res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
      })
      .catch((err) => res.json('Have an error: ' + err.message))
  
   
  }
  else if(checkResult === 1 ) {
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('Id not exists')
      }
  else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Id not valid')
  }
}

 
const lookingFilms = (req, res) => {
    const query = `SELECT f.id, filmName, originName, thurmUrl, posterUrl, trailerUrl ,slug ,  status, episodeCurrent, episodeTotal, released, countryName FROM film f, country c where f.country = c.id AND (f.filmName LIKE '%${req.query.search}%' OR f.originName LIKE '%${req.query.search}%')`
    
    mssql.query(query)
        .then(async (result) => {
            let films = result.recordset
            const filmsPromise = films.map(f => {
                    let queryCate = 'SELECT categoryName FROM film_category fc, category c WHERE fc.categoryId = c.id AND fc.filmId = ' + f.id
                    
                    return mssql.query(queryCate)
                        .then((categoriesRes) =>{
                            let categories = categoriesRes.recordset.map(c => c.categoryName)
                            f.slug = f.slug.trim()
                            f.rated = (Math.random() * 10).toFixed(1)
                            f.categories = categories
                            return f
                        })
                        .catch(error => {
                            console.error('Error:', error.message);
                          });
            })
            return Promise.all(filmsPromise)
        })
        .then((films) => res.json(films))   
}

module.exports = {
    getAllFilm,
    createFilm,
    getFilmEdit,
    updateFilm,
    deleteFilm,
    lookingFilms
}
