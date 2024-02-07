'use strict';

const connection = require('../dbs/mysql.db');

class PlaylistModel {
          static tableName = '`dbo.playlist`'
          constructor () {
                    connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
                        \`id\` smallint(6) DEFAULT NULL,
                        \`userId\` smallint(6) DEFAULT NULL,
                        \`filmId\` smallint(6) DEFAULT NULL
                      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
                }
          static addToPlaylist = async (userId, filmId) => {
                    return new Promise((resolve, reject) => {

                    })
          }
}

module.exports = PlaylistModel
