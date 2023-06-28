const route = require('express').Router()
const {
  getAllCategory,
  getCategoryEdit,
  getCategoriesByFilm,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controller/categoryController')

route.post('/create', createCategory)
route.get('/film', getCategoriesByFilm)
route.get('/edit', getCategoryEdit)
route.put('/edit', updateCategory)
route.delete('/delete', deleteCategory)
route.get('/', getAllCategory)

module.exports = route
