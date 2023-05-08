const mssql = require('../db.js')

const getAllCategory = (req, res) => {
    const query = 'SELECT id, categoryName FROM category'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const createCategory = (req, res) => {
    const data = req.body;
    const query = `INSERT INTO category ([categoryName])
    VALUES (N'${data.categoryName}')`

    mssql.query(query)
        .then((result) => res.json(result.rowsAffected))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getCategoryEdit = (req, res) => {
    let id = req.query.id
    const query = 'SELECT categoryName FROM category WHERE id=' + id

    mssql.query(query)
        .then((result) => res.json(result.recordset[0]))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const updateCategory = (req, res) => {
    const data = req.body;
    const query = `UPDATE [dbo].[category]
    SET [categoryName] = N'${data.categoryName}'
  WHERE id = ${data.id}`
  
    mssql.query(query)
        .then((result) => res.json(result.rowsAffected))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteCategory = (req, res) => {
    const id = req.query.id;
    const query = `DELETE FROM category WHERE id = ${id}`
  
    mssql.query(query)
        .then((result) => res.json(result.rowsAffected))
        .catch((err) => res.json('Have an error: ' + err.message))
}

module.exports = {
    getAllCategory,
    getCategoryEdit,
    createCategory,
    updateCategory,
    deleteCategory
}