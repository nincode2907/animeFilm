const route = require('express').Router();
const FilmController = require('../controllers/filmController');
const { asyncFunction } = require('../utils/index.util');


route.post('/create', asyncFunction(FilmController.createFilm))
route.get('/edit', asyncFunction(FilmController.getFilmEdit))
route.put('/edit', asyncFunction(FilmController.updateFilm))
route.delete('/delete', asyncFunction(FilmController.deleteFilm))
route.get('/search', asyncFunction(FilmController.lookingFilms))
route.get('', asyncFunction(FilmController.getAllFilm))

module.exports = route
