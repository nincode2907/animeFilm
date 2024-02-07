
const connection = require('../dbs/mysql.db');
const { EntityError } = require('../middlewares/error.response');
const { consoleLogValue } = require('../utils/log.util');

const checkValidId = async (id, tableName) => {
    id = parseInt(id)
    if(!isNaN(id) && id > 0) {
        const queryCheckId = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ${id}`;
        return new Promise(async (resolve, reject) => {
            await connection.query(queryCheckId, (err, results) => {
                if(err) reject(new EntityError('Check failed'))
                resolve(results[0].count === 1 ? 2 : 1);
            });
        })
    }
    return 0;
}

module.exports = {
    checkValidId
}