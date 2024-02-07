'use strict';

const FilmModel = require('../models/film.model')

class FilmController {
  getAllFilm = async (req, res, next) => {
    res.status(200).json( await FilmModel.getAllFilm())
  }
  
  createFilm = async (req, res, next) => {
    res.status(200).json( await FilmModel.createFilm(req.body))
  }
  
  getFilmEdit = async (req, res) => {
    res.status(200).json(await FilmModel.getFilmEdit(req.query.id));
  }
  
  updateFilm = async (req, res) => {
    res.status(200).json(await FilmModel.updateFilm(req.body));
  }
  
  deleteFilm = async (req, res) => {
    res.status(200).json(await FilmModel.deleteFilm(req.query.id));
  }
  
  lookingFilms = async (req, res) => {
    res.status(200).json(await FilmModel.lookingFilms(req.query.search))
  }
}

module.exports = new FilmController
