<<<<<<< HEAD
const route = require('express').Router();
const {getAllFilm, createFilm, getFilmEdit, updateFilm, deleteFilm, lookingFilms} = require('../controller/filmController')

=======
const route = require('express').Router()
const { getAllFilm, createFilm, getFilmEdit, updateFilm, deleteFilm } = require('../controller/filmController')
>>>>>>> 937ee32ce80c9d3da01630362485121e9b770cbf

route.post('/create', createFilm)
route.get('/edit', getFilmEdit)
route.put('/edit', updateFilm)
route.delete('/delete', deleteFilm)
route.get('/search', lookingFilms)
route.get('/', getAllFilm)

module.exports = route
