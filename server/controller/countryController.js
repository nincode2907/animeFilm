const mssql = require('../db.js')

const getAllCountry = (req, res) => {
    const query = 'SELECT id, countryName, countryCode FROM country'

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

module.exports = getAllCountry