const route = require('express').Router();
const CountryController = require('../controllers/countryController');
const { asyncFunction } = require('../utils/index.util');

route.get('/', asyncFunction(CountryController.getAllCountry))

module.exports = route