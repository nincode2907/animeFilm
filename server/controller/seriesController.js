const mssql = require('../db.js')
const {addNotification} = require('./notifyController.js')

const getAllSeries = (req, res) => { 
    const query = 'SELECT id, seriesName FROM series'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const createSeries = (req, res) => {
    const data = req.body;
    const query = `INSERT INTO series ([seriesName])
    VALUES (N'${data.seriesName}')`

    mssql.query(query)
        .then((result) => {
            addNotification('New series','was created')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getSeriesEdit = (req, res) => {
    let id = req.query.id
    const query = 'SELECT seriesName FROM series WHERE id=' + id

    mssql.query(query)
        .then((result) => res.json(result.recordset[0]))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const updateSeries = (req, res) => {
    const data = req.body;
    const query = `UPDATE [dbo].[series]
    SET [seriesName] = N'${data.seriesName}'
  WHERE id = ${data.id}`
  
    mssql.query(query)
        .then((result) => {
            addNotification(`Series ${data.seriesName}`, 'was updated')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteSeries = (req, res) => {
    const id = req.query.id;
    const query = `DELETE FROM series WHERE id = ${id}`
  
    mssql.query(query)
        .then((result) => {
            addNotification('A series', 'was deleted')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

module.exports = {
    getAllSeries,
    getSeriesEdit,
    createSeries,
    updateSeries,
    deleteSeries
}