const route = require('express').Router();
const getAllCountry = require('../controller/countryController')

route.get('/', getAllCountry)

module.exports = route