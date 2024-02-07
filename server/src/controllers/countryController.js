const CountryModel = require('../models/country.model')

class CountryController {
    getAllCountry = async (req, res, next) => {
        res.status(200).json(await CountryModel.getAllCountry())
    }

}

module.exports = new CountryController