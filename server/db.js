const mssql = require('mssql');

const config = {
    server: 'NIN',
    user: 'animeFilmLogin',
    password: '123',
    database: 'animeFilm',
    encrypt: false
}

mssql.connect(config)
    .then(() => console.log('Connect successfully!!'))
    .catch(err => console.log('Error connecting'+err.message))

module.exports = mssql