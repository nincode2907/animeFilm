const mssql = require('../db.js')
const {addNotification} = require('./notifyController.js')

const getAllFilm = (req, res) => {
    const query = 'SELECT f.id, filmName, originName, thurmUrl , status, episodeCurrent, episodeTotal, countryName FROM film f, country c where f.country = c.id'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}


const createFilm = (req, res) => {
    const data =  req.body
    const status = data.status ? 1 : 0
    const episodeTotal = data.episodeTotal ? data.episodeTotal : null
    const query = `
    INSERT INTO film (
        [filmName]
        ,[originName]
        ,[status]
        ,[thurmUrl]
        ,[trailerUrl]
        ,[posterUrl]
        ,[episodeCurrent]
        ,[episodeTotal]
        ,[timeUNE]
        ,[released]
        ,[viewCount]
        ,[slug]
        ,[director]
        ,[country]
        ,[description])
    VALUES (
        N'${data.filmName}', 
        N'${data.originName}', 
        ${status}, 
        '${data.thumbUrl}',
        '${data.trailerUrl}', 
        '${data.posterUrl}', 
        0, 
        ${episodeTotal}, 
        N'${data.timeUNE}', 
        '${data.released}',  
        0, 
        '${data.slug}',  
        N'${data.director}', 
        ${data.country},
        N'${data.description}'
    )`

    mssql.query(query)
        .then((result) => {
            console.log("oke")
            addNotification(`${data.filmName} film`, 'was created')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getFilmEdit = (req, res) => {
    const id = req.query.id
    const query = 'SELECT filmName, originName, status, thurmUrl, trailerUrl, posterUrl, episodeCurrent, episodeTotal, timeUNE, released, slug, director , country , description  FROM film  where id = ' + id 

    mssql.query(query)
        .then((result) => res.json(result.recordset[0]))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const updateFilm = (req, res) => {
    const data = req.body
    const status = data.status ? 1 : 0
    const episodeTotal = data.episodeTotal ? data.episodeTotal : null
    console.log(data);
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
       ,[country] = ${data.country}
       ,[description] = N'${data.description}'
  WHERE id=${data.id}`
    mssql.query(query)
        .then((result) => {
            addNotification(`Film ${data.filmName}`, 'was updated')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteFilm = (req, res) => {
    const id = req.query.id;
    const query = `DELETE FROM film WHERE id = ${id}`
  
    mssql.query(query)
        .then((result) => {
            addNotification('A film', 'was deleted')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

module.exports = {
    getAllFilm,
    createFilm,
    getFilmEdit,
    updateFilm,
    deleteFilm
}