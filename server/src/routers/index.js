const express = require('express')
const router = express.Router()

router.use('/api/film/', require('./filmRoute'))
router.use('/api/episode/', require('./episodeRoute'))
router.use('/api/category/', require('./categoryRoute'))
router.use('/api/country/', require('./countryRoute'))
router.use('/api/notify/', require('./notifyRoute'))
router.use('/api/series/', require('./seriesRoute'))

module.exports = router