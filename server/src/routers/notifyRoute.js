const route = require('express').Router();
const {getAllNotification} = require('../controllers/notifyController');
const { asyncFunction } = require('../utils/index.util');

route.get('/', asyncFunction(getAllNotification))

module.exports = route