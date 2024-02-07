const { asyncFunction } = require('../utils/index.util');
const SeriesController = require('../controllers/seriesController')

const route = require('express').Router();

route.post('/create', asyncFunction(SeriesController.createSeries))
route.get('/edit', asyncFunction(SeriesController.getSeriesEdit))
route.put('/edit', asyncFunction(SeriesController.updateSeries))
route.delete('/delete', asyncFunction(SeriesController.deleteSeries))
route.get('/', asyncFunction(SeriesController.getAllSeries))

module.exports = route