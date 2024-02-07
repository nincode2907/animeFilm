'use strict'

const FilmModel = require('../models/film.model')

class FilmController {
  getAllFilm = async (req, res, next) => {
    res.status(200).json(await FilmModel.getAllFilm())
  }

  createFilm = async (req, res, next) => {
    res.status(201).json(await FilmModel.createFilm(req.body))
  }

  getFilmEdit = async (req, res) => {
    res.status(200).json(await FilmModel.getFilmEdit(req.query.id))
  }

  getFilmByCategory = async (req, res) => {
    const cateID = req.params.id
    res.status(200).json(await FilmModel.getFilmByCategory(cateID))
  }

  updateFilm = async (req, res) => {
    res.status(200).json(await FilmModel.updateFilm(req.body))
  }

  deleteFilm = async (req, res) => {
    res.status(200).json(await FilmModel.deleteFilm(req.query.id))
  }

  lookingFilms = async (req, res) => {
    res.status(200).json(await FilmModel.lookingFilms(req.query.search))
  }
}

module.exports = new FilmController()
