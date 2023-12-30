'use strict';

const connection = require('../dbs/mysql.db');
const { EntityError } = require('../middlewares/error.response');

class CountryModel {

    static tableName = '`dbo.country`'

    constructor () {
        connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
            \`id\` smallint(6) DEFAULT NULL,
            \`countryName\` varchar(32) DEFAULT NULL,
            \`countryCode\` varchar(25) DEFAULT NULL,
            \`isoCode\` varchar(20) DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    static getAllCountry = async () => {
        const query = `SELECT id, countryName, countryCode FROM ${this.tableName}`
    
        return new Promise(async (resolve, reject) => {
            await connection.query(query, (err, results) => {
                if(err) reject(new EntityError('Get all countries failed'))
                
                resolve(results)
            })
        })
    }
}

module.exports = CountryModel