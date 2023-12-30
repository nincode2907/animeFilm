'use strict';

const connection = require('../dbs/mysql.db');
const { EntityError } = require('../middlewares/error.response');

class NotifyModel {

    static tableName = '`dbo.notify`'

    constructor () {
        connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
            \`id\` smallint(6) DEFAULT NULL,
            \`action\` varchar(11) DEFAULT NULL,
            \`time\` varchar(19) DEFAULT NULL,
            \`strongOfAction\` varchar(65) DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    static getAllNotification = async () => {
        const query = `SELECT * FROM ${this.tableName} ORDER BY time DESC LIMIT 20`

        return new Promise(async (resolve, reject) => {
            await connection.query(query, (err, results) => {
                if(err) reject(new EntityError('Get all notifications failed'))
                
                resolve(results)
            })
        })
    }

    static addNotification = (strongAction, action) => {
        let now = new Date().toISOString();
        const query = `INSERT INTO ${this.tableName} ([action], [strongOfAction], [time]) VALUES (N'${action}', N'${strongAction}', '${now}')`

        connection.query(query, (err, results) => {
            if(err) throw new EntityError('Add notification failed')

        })
    }
}

module.exports = NotifyModel