'use strict';

const connection = require('../dbs/mysql.db');
const SeriesModel = require('../models/series.model.js')
const {addNotification} = require('./notifyController.js')
const {checkValidId} = require('./staticFuture.js')

class SeriesController {
    getAllSeries = async (req, res, next) => { 
        res.status(200).json(await SeriesModel.getAllSeries())
    }

    createSeries = async (req, res) => {
       await SeriesModel.createSeries(req.body)
    }

    getSeriesEdit = async (req, res) => {
       res.status(200).json(await SeriesModel.getSeriesEdit(req.query.id))
    }

    updateSeries = async (req, res) => {
        await SeriesModel.updateSeries(req.body)
    }

    deleteSeries = async (req, res) => {
        await SeriesModel.deleteSeries(req.query.id)
    }
}

module.exports = new SeriesController