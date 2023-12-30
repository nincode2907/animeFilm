'use strict';

const connection = require('../dbs/mysql.db');
const { EntityError } = require('../middlewares/error.response');
const { checkValidId } = require('../controllers/staticFuture.js');
const { addNotification } = require('./notify.model.js');

class SeriesModel {

    static tableName = '`dbo.series`';

    constructor() {
        connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
            \`id\` tinyint(4) DEFAULT NULL,
            \`seriesName\` varchar(106) DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    static getAllSeries = async () => {
        const query = `SELECT id, seriesName FROM ${this.tableName}`

        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(new EntityError('Get all notifications failed'))

                resolve(results)
            })
        })
    }

    static createSeries = async (data) => {
        try {
            const query = `INSERT INTO ${this.tableName} (seriesName) VALUES (?)`;
            const values = [data.seriesName];

            return new Promise((resolve, reject) => {
                connection.query(query, values, (err, result) => {
                    if (err) {
                        reject(new EntityError('Add series failed'));
                    } else {
                        addNotification(`Series ${data.seriesName}`, 'was created');
                        resolve(`Series ${data.seriesName} was created`);
                    }
                });
            });
        } catch (err) {
            return Promise.reject(new EntityError('Add series failed'));
        }
    }

    static getSeriesEdit = async (id) => {
        if (id) return Promise.reject(new EntityError('Id not found'));

        let checkResult = await checkValidId(id, this.tableName);
        if (checkResult === 2) {
            const query = `SELECT seriesName FROM ${this.tableName} WHERE id = ?`;
            const values = [id];

            return new Promise((resolve, reject) => {
                connection.query(query, values, (err, result) => {
                    if (err) {
                        reject(new EntityError('Get series failed'));
                    } else {
                        resolve(result);
                    }
                });
            });
        } else if (checkResult === 1) {
            return Promise.reject(new EntityError('Id not exists'));
        } else {
            return Promise.reject(new EntityError('Id not valid'));
        }
    }

    static updateSeries = async (data) => {
        const query = `UPDATE ${this.tableName} SET seriesName = ? WHERE id = ?`;
        const values = [data.seriesName, data.id];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(new EntityError('Update series failed'));
                } else {
                    addNotification(`Series ${data.seriesName}`, 'was updated');
                    resolve(result.affectedRows);
                }
            });
        });
    }

    static deleteSeries = async (id) => {
        if (id) {
            return Promise.reject(new EntityError('Id not found'));
        }

        return new Promise(async (resolve, reject) => {
            let checkResult = await checkValidId(id, 'episode');
            if (checkResult === 2) {
                const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
                const values = [id];

                connection.query(query, values, (err, result) => {
                    if (err) {
                        reject(new EntityError('Delete series failed'));
                    } else {
                        addNotification('A series', 'was deleted');
                        resolve(result.affectedRows);
                    }
                });
            } else if (checkResult === 1) {
                reject(new EntityError('Id not found'));
            } else {
                reject(new EntityError('Id not valid'));
            }
        });
    };
}

module.exports = SeriesModel;