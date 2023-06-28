const mssql = require('../db.js')
const {addNotification} = require('./notifyController.js')
const {checkValidId} = require('./staticFuture.js')

const getAllCategory = (req, res) => {
    const query = 'SELECT id, categoryName FROM category ORDER BY categoryName ASC'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getCategoriesByFilm = async (req, res) => {
    let id = req.query.filmId
    let checkResult = await checkValidId(id, 'film')
    if(checkResult === 2) {
        const query = 'SELECT categoryId FROM film_category WHERE filmId = ' + id

        mssql.query(query)
            .then((result) => {
                const categoryIds = result.recordset.map((c) => c.categoryId)
                res.json(categoryIds)
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

const createCategory = (req, res) => {
    const data = req.body;
    const query = `INSERT INTO category ([categoryName])
    VALUES (N'${data.categoryName}')`

    mssql.query(query)
        .then((result) => {
            addNotification('New category','was created')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const getCategoryEdit = async (req, res) => {
    let id = req.query.id
    let checkResult = await checkValidId(id, 'category')
    if(checkResult === 2) {
        const query = 'SELECT categoryName FROM category WHERE id=' + id

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

const updateCategory = (req, res) => {
    const data = req.body;
    const query = `UPDATE [dbo].[category]
    SET [categoryName] = N'${data.categoryName}'
  WHERE id = ${data.id}`
  
    mssql.query(query)
        .then((result) => {
            addNotification(`Category ${data.categoryName}`, 'was updated')
            res.json(result.rowsAffected)
        })
        .catch((err) => res.json('Have an error: ' + err.message))
}

const deleteCategory = async (req, res) => {
    let id = req.query.id
    let checkResult = await checkValidId(id, 'category')
    if(checkResult === 2) {
        const query = `DELETE FROM category WHERE id = ${id}`
  
        mssql.query(query)
            .then((result) => {
                addNotification('A category', 'was deleted')
                res.json(result.rowsAffected)
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

module.exports = {
    getAllCategory,
    getCategoryEdit,
    getCategoriesByFilm,
    createCategory,
    updateCategory,
    deleteCategory
}