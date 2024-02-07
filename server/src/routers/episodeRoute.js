const route = require('express').Router();
const EpisodeController = require('../controllers/episodeController');
const { asyncFunction } = require('../utils/index.util');


route.post('/create', asyncFunction(EpisodeController.createEpisode));
route.get('/edit', asyncFunction(EpisodeController.getEpisodeEdit));
route.put('/edit', asyncFunction(EpisodeController.updateEpisode));
route.delete('/delete', asyncFunction(EpisodeController.deleteEpisode));
route.get('/film', asyncFunction(EpisodeController.getAllEpisodeWithFilm));
route.get('/', asyncFunction(EpisodeController.getAllEpisode));

module.exports = route