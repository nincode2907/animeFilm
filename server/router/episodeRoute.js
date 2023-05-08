const route = require('express').Router();
const {getAllEpisode, getAllEpisodeWithFilm, createEpisode, getEpisodeEdit, updateEpisode, deleteEpisode} = require('../controller/episodeController')


route.post('/create', createEpisode)
route.get('/edit', getEpisodeEdit)
route.put('/edit', updateEpisode)
route.delete('/delete', deleteEpisode)
route.get('/film', getAllEpisodeWithFilm)
route.get('/', getAllEpisode)

module.exports = route