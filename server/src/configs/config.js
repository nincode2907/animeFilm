const config = {
    dev: {
        'mysql': {
            'type' : process.env.SQL_TYPE || 'mysql',
            'host': process.env.ENVIRONMENT || 'localhost',
            'port': process.env.DATABASE_MYSQL_PORT || '3306',
            'username': process.env.DATABASE_MYSQL_USERNAME || 'root',
            'password': process.env.DATABASE_MYSQL_PASS || '',
            'dbname': process.env.DATABASE_MYSQL_NAME || 'anime_films',
        },
        'mssql': {
            'type' : process.env.SQL_TYPE || 'mssql',
            'server': process.env.DATABASE_MSSQL_SERVER || 'NIN',
            'username': process.env.DATABASE_MSSQL_USERNAME || 'sa',
            'password': process.env.DATABASE_MSSQL_PASS || '123',
            'dbname': process.env.DATABASE_MYSQL_NAME || 'animeFilm',
        }
    },
    pro: {
        'mysql': {
            'type' : process.env.SQL_TYPE || 'mysql',
            'host': process.env.ENVIRONMENT || 'localhost',
            'port': process.env.DATABASE_MYSQL_PORT || '3306',
            'username': process.env.DATABASE_MYSQL_USERNAME || 'root',
            'password': process.env.DATABASE_MYSQL_PASS || '',
            'dbname': process.env.DATABASE_MYSQL_NAME || 'anime_films',
        },
        'mssql': {
            'type' : process.env.SQL_TYPE || 'mssql',
            'server': process.env.DATABASE_MSSQL_SERVER || 'NIN',
            'username': process.env.DATABASE_MSSQL_USERNAME || 'sa',
            'password': process.env.DATABASE_MSSQL_PASS || '123',
            'dbname': process.env.DATABASE_MYSQL_NAME || 'animeFilm',
        }
    }
}

const environment = process.env.ENVIRONMENT || 'dev'
const sqlType = process.env.SQL_TYPE || 'mysql'

module.exports = config[environment][sqlType]