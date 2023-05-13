const route = require('express').Router();
const {getAllNotification} = require('../controller/notifyController');

route.get('/', getAllNotification)

module.exports = route