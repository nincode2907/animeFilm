const CategoryController = require('../controllers/categoryController')
const { asyncFunction } = require('../utils/index.util')

const route = require('express').Router()


route.post('/create', asyncFunction(CategoryController.createCategory))
route.get('/film', asyncFunction(CategoryController.getCategoriesByFilm))
route.get('/edit', asyncFunction(CategoryController.getCategoryEdit))
route.put('/edit', asyncFunction(CategoryController.updateCategory))
route.delete('/delete', asyncFunction(CategoryController.deleteCategory))
route.get('/', asyncFunction(CategoryController.getAllCategory))

module.exports = route
