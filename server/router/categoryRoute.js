const route = require('express').Router()
const {
  getAllCategory,
  getCategoryEdit,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controller/categoryController')

route.post('/create', createCategory)
route.get('/edit', getCategoryEdit)
route.put('/edit', updateCategory)
route.get('/', getAllCategory)
route.delete('/delete', deleteCategory)

module.exports = route
