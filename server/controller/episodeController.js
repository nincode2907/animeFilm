const mssql = require('../db.js')

const getAllEpisode = (req, res) => {
    const query = 'SELECT e.id,e.name, number_set, linkEmbed, f.thurmUrl FROM film f, episode e WHERE f.id = e.film_id'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getAllEpisodeWithFilm = (req, res) => {
    let filmId = req.query.filmId
    const query = 'SELECT e.id,e.name, number_set, linkEmbed, f.thurmUrl FROM film f, episode e WHERE f.id = e.film_id AND f.id =' + filmId

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const createEpisode = (req, res) => {
    const data = req.body;
    const query = `INSERT INTO episode ([name]
        ,[number_set]
        ,[linkEmbed]
        ,[film_id])
    VALUES (N'${data.episodeName}',${data.numberSet}, '${data.linkEmbed}',${data.filmId})`

    mssql.query(query)
        .then((result) => res.json(result.rowsAffected))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getEpisodeEdit = (req, res) => {
    let id = req.query.id
    const query = 'SELECT name, number_set, linkEmbed, film_id FROM episode WHERE id=' + id

    mssql.query(query)
        .then((result) => res.json(result.recordset[0]))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const updateEpisode = (req, res) => {
    const data = req.body;
    const query = `UPDATE [dbo].[episode]
    SET [number_set] = ${data.numberSet}
       ,[name] =  N'${data.episodeName}'
       ,[linkEmbed] =  '${data.linkEmbed}'
       ,[film_id] =  ${data.filmId}
  WHERE id = ${data.id}`
  
    mssql.query(query)
        .then((result) => res.json(result.rowsAffected))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteEpisode = (req, res) => {
    const id = req.query.id;
    const query = `DELETE FROM episode WHERE id = ${id}`
  
    mssql.query(query)
        .then((result) => res.json(result.rowsAffected))
        .catch((err) => res.json('Have an error: ' + err.message))
}

module.exports = {
    getAllEpisode,
    getAllEpisodeWithFilm,
    createEpisode,
    getEpisodeEdit,
    updateEpisode,
    deleteEpisode
}

