const mssql = require('../db.js')
const {addNotification} = require('./notifyController.js')
const {checkValidId} = require('./staticFuture.js')

const getAllEpisode = (req, res) => {
    const query = 'SELECT e.id,f.filmName, number_set, e.created_at, linkEmbed, f.thurmUrl FROM film f, episode e WHERE f.id = e.film_id'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getAllEpisodeWithFilm = async (req, res) => {
    let filmId = req.query.filmID
    let checkResult = await checkValidId(filmId, 'film')
    if(checkResult === 2) {
        const query = `SELECT e.id,e.name, number_set, e.created_at, linkEmbed, f.thurmUrl FROM film f, episode e WHERE f.id = e.film_id AND f.id = ${filmId} ORDER BY number_set`
    
        mssql.query(query)
            .then((result) => res.json(result.recordset))
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

const createEpisode = (req, res) => {
    const data = req.body;
    const now = new Date().toISOString();
    const query = `INSERT INTO episode ([name]
        ,[number_set]
        ,[linkEmbed]
        ,[film_id]
        ,[created_at]
        ,[updated_at])
    VALUES (N'${data.filmName} tập ${data.number_set} vietsub',${data.numberSet}, '${data.linkEmbed}',${data.filmId},'${now}','${now}')`
    
    mssql.query(query)
        .then((result) => {
            addNotification(`New episode of ${data.filmName}`, 'was created')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getEpisodeEdit = async (req, res) => {
    let id = req.query.id
    let checkResult = await checkValidId(id, 'episode')
    if(checkResult === 2) {
        const query = 'SELECT number_set, linkEmbed, film_id FROM episode WHERE id=' + id
        
        mssql.query(query)
            .then((result) => res.json(result.recordset[0]))
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

const updateEpisode = (req, res) => {
    const data = req.body;
    const now = new Date().toISOString();
    const query = `UPDATE [dbo].[episode]
    SET [number_set] = ${data.numberSet}
       ,[name] =  N'${data.filmName} tập ${data.numberSet} vietsub'
       ,[linkEmbed] =  '${data.linkEmbed}'
       ,[film_id] =  ${data.filmId}
       ,[updated_at] =  '${now}'
  WHERE id = ${data.id}`
  
    mssql.query(query)
        .then((result) => {
            addNotification(`Episode tập ${data.number_set} of ${data.filmName}`, 'was updated')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteEpisode = async (req, res) => {
    const id = req.query.id;
    let checkResult = await checkValidId(id, 'episode')
    if(checkResult === 2) {
        const query = `DELETE FROM episode WHERE id = ${id}`
  
        mssql.query(query)
            .then((result) => {
                addNotification('A episode', 'was deleted')
                res.json(result.rowsAffected)
            })
            .catch((err) => res.json('Have an error: ' + err.message))
    }
    else if(checkResult === 1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Id not exists')
        }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Id not valid')
    }
}

module.exports = {
    getAllEpisode,
    getAllEpisodeWithFilm,
    createEpisode,
    getEpisodeEdit,
    updateEpisode,
    deleteEpisode
}

