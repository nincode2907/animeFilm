const route = require('express').Router()
const { getAllFilm, createFilm, getFilmEdit, updateFilm, deleteFilm } = require('../controller/filmController')

route.post('/create', createFilm)
route.get('/edit', getFilmEdit)
route.put('/edit', updateFilm)
route.delete('/delete', deleteFilm)
route.get('/', getAllFilm)

module.exports = route
