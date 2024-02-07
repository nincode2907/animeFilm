const route = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const FilmController = require('../controllers/filmController');
const { asyncFunction } = require('../utils/index.util');


route.post('/create', upload.single('file'), asyncFunction(FilmController.createFilm));
route.get('/edit', asyncFunction(FilmController.getFilmEdit));
route.put('/edit', upload.single('file'), asyncFunction(FilmController.updateFilm));
route.delete('/delete', asyncFunction(FilmController.deleteFilm));
route.get('/search', asyncFunction(FilmController.lookingFilms));
route.get('', asyncFunction(FilmController.getAllFilm));

module.exports = route;
