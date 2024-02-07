'use strict';

const connection = require('../dbs/mysql.db');
const { EntityError } = require('../middlewares/error.response');
const {checkValidId} = require('../controllers/staticFuture.js')

class EpisodeModel {

    static tableName = '`dbo.film`';

    constructor () {
        connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
            \`id\` smallint(6) DEFAULT NULL,
            \`number_set\` tinyint(4) DEFAULT NULL,
            \`name\` varchar(123) DEFAULT NULL,
            \`linkEmbed\` varchar(36) DEFAULT NULL,
            \`film_id\` smallint(6) DEFAULT NULL,
            \`created_at\` varchar(19) DEFAULT NULL,
            \`updated_at\` varchar(19) DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`)
    }

    static getAllEpisode = async () => {
        const query = `SELECT e.id,f.filmName, number_set, e.created_at, linkEmbed, f.thurmUrl FROM \`dbo.film\` f, ${this.tableName} e WHERE f.id = e.film_id`

        return new Promise(async (resolve, reject) => {
            await connection.query(query, (err, results) => {
                if(err) reject(new EntityError('Can not get all episodes'))

                resolve(results)
            })
        })
    }

    static getAllEpisodeWithFilm = (filmId) => {
        if (filmId) return new EntityError('Film ID not found');

        return new Promise(async (resolve, reject) => {
            let checkResult = await checkValidId(filmId, 'film');
                if (checkResult === 2) {
                    const query = `SELECT e.id,e.name, number_set, e.created_at, linkEmbed, f.thurmUrl FROM film f, episode e WHERE f.id = e.film_id AND f.id = ? ORDER BY number_set`;
                    connection.query(query, [filmId], (err, results) => {
                        if (err) {
                            reject(new EntityError('An error occurred while fetching episodes.'));
                        } else {
                            resolve(results);
                        }
                    });
                } else if (checkResult === 1) {
                    reject(new EntityError('Film ID does not exist.'));
                } else {
                    reject(new EntityError('Invalid Film ID.'));
                }
        });
    }

    static createEpisode = async (data) => {
        const now = new Date().toISOString();
        const query = `INSERT INTO ${this.tableName} ([name]
            ,[number_set]
            ,[linkEmbed]
            ,[film_id]
            ,[created_at]
            ,[updated_at])
        VALUES (?, ?, ?, ?, ?, ?)`;
        
        return new Promise((resolve, reject) => {
            connection.query(query, [`${data.filmName} tập ${data.number_set} vietsub`, data.numberSet, data.linkEmbed, data.filmId, now, now], (err, result) => {
                if (err) {
                    reject(new EntityError('An error occurred while creating the episode.'));
                } else {
                    addNotification(`New episode of ${data.filmName}`, 'was created');
                    resolve("Episode created successfully");
                }
            });
        });
    }

    static getEpisodeEdit = async (id) => {
        let checkResult = await checkValidId(id, this.tableName);
        if (checkResult === 2) {
            const query = `SELECT number_set, linkEmbed, film_id FROM ${this.tableName} WHERE id = ?`;
            return new Promise((resolve, reject) => {
                connection.query(query, [id], (err, results) => {
                    if (err) {
                        reject(new EntityError('An error occurred while fetching the episode.'));
                    } else {
                        resolve(results[0]);
                    }
                });
            });
        } else if (checkResult === 1) {
            throw new EntityError('Id does not exist.');
        } else {
            throw new EntityError('Invalid Id.');
        }
    }

    static updateEpisode = async (data) => {
        const now = new Date().toISOString();
        const query = `UPDATE ${this.tableName}
        SET \`number_set\` = ?,
        \`name\` = ?,
        \`linkEmbed\` = ?,
        \`film_id\` = ?,
        \`updated_at\` = ?
        WHERE \`id\` = ?`;

        const params = [data.numberSet, `${data.filmName} tập ${data.numberSet} vietsub`, data.linkEmbed, data.filmId, now, data.id];

        return new Promise((resolve, reject) => {
            connection.query(query, params, (err, result) => {
                if (err) {
                    reject(new EntityError('An error occurred while updating the episode.'));
                } else {
                    addNotification(`Episode tập ${data.number_set} of ${data.filmName}`, 'was updated');
                    resolve("Episode updated successfully");
                }
            });
        });
    }

    static deleteEpisode = async (id) => {
        let checkResult = await checkValidId(id, this.tableName);
        if (checkResult === 2) {
            const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
            const params = [id];

            return new Promise((resolve, reject) => {
                connection.query(query, params, (err, result) => {
                    if (err) {
                        reject(new EntityError('An error occurred while deleting the episode.'));
                    } else {
                        addNotification(`Episode ${data.number_set} of ${data.filmName}`, 'was deleted');
                        resolve("Episode deleted successfully");
                    }
                });
            });
        } else if (checkResult === 1) {
            throw new EntityError('Id does not exist.');
        } else {
            throw new EntityError('Invalid Id.');
        }
    }
}

module.exports = EpisodeModel