const route = require('express').Router();
const {getAllSeries, getSeriesEdit, createSeries, updateSeries, deleteSeries} = require('../controller/seriesController')

route.post('/create', createSeries)
route.get('/edit', getSeriesEdit)
route.put('/edit', updateSeries)
route.get('/', getAllSeries)
route.delete('/delete', deleteSeries)

module.exports = route