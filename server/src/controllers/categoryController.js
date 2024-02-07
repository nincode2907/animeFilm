const connection = require('../dbs/mysql.db')
const CategoryModel = require('../models/category.model.js')
const {addNotification} = require('./notifyController.js')
const {checkValidId} = require('./staticFuture.js')

class CategoryController {

    getAllCategory = async (req, res, next) => {
        res.status(200).json(await CategoryModel.getAllCategory())
    }

    getCategoriesByFilm = async (req, res) => {
        res.status(200).json(await CategoryModel.getCategories(req.query.filmId))
    }

    createCategory = async (req, res) => {
        res.status(201).json(await CategoryModel.createCategory(req.body))
    }

    getCategoryEdit = async (req, res) => {
        res.status(200).json(await CategoryModel.getCategoryEdit(req.query.id))
    }

    updateCategory = async (req, res) => {
        res.status(200).json(await CategoryModel.updateCategory(req.body))
    }

    deleteCategory = async (req, res) => {
        res.status(200).json(await CategoryModel.deleteCategory(req.query.id))
    }
}

module.exports = new CategoryController