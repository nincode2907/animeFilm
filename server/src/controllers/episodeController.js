const EpisodeModel = require('../models/episode.model.js')

class EpisodeController {
    
    getAllEpisode = async (req, res, next) => {
        res.status(200).json(await EpisodeModel.getAllEpisode())
    }

    getAllEpisodeWithFilm = async (req, res, next) => {
        res.status(200).json(await EpisodeController.getAllEpisodeWithFilm(req.query.filmID))
    }

    createEpisode = async (req, res, next) => {
       res.status(201).json(await EpisodeModel.createEpisode(req.body))
    }

    getEpisodeEdit = async (req, res, next) => {
        res.status(200).json(await EpisodeModel.getEpisodeEdit(req.query.id))
    }

    updateEpisode = async (req, res, next) => {
       res.status(200).json(await EpisodeModel.updateEpisode(req.body))
    }

    deleteEpisode = async (req, res, next) => {
        res.status(200).json(await EpisodeModel.deleteEpisode(req.query.id))
    }
}

module.exports = new EpisodeController