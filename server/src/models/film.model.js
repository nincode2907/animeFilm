'use strict';

const { checkValidId } = require('../controllers/staticFuture');
const connection = require('../dbs/mysql.db');
const { EntityError } = require('../middlewares/error.response');
const { consoleLogValue } = require('../utils/log.util');
const { addNotification } = require('./notify.model');

class FilmModel {

    static tableName = '`dbo.film`';

    constructor () {
        connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
            \`id\` smallint(6) DEFAULT NULL,
            \`filmName\` varchar(255) DEFAULT NULL,
            \`originName\` varchar(255) DEFAULT NULL,
            \`status\` tinyint(4) DEFAULT NULL,
            \`thurmUrl\` varchar(153) DEFAULT NULL,
            \`trailerUrl\` varchar(28) DEFAULT NULL,
            \`posterUrl\` text,
            \`episodeCurrent\` varchar(2) DEFAULT NULL,
            \`episodeTotal\` varchar(3) DEFAULT NULL,
            \`timeUNE\` varchar(63) DEFAULT NULL,
            \`viewCount\` smallint(6) DEFAULT NULL,
            \`slug\` varchar(255) DEFAULT NULL,
            \`director\` varchar(33) DEFAULT NULL,
            \`country\` smallint(6) DEFAULT NULL,
            \`description\` text,
            \`created_at\` varchar(19) DEFAULT NULL,
            \`updated_at\` varchar(19) DEFAULT NULL,
            \`released\` varchar(10) DEFAULT NULL,
            \`part\` varchar(9) DEFAULT NULL,
            \`seriesId\` tinyint(4) DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    static getAllFilm = () => {
        const query =
          'SELECT f.id, filmName, originName, thurmUrl, posterUrl, slug, description, status, episodeCurrent, episodeTotal, released, countryName FROM ' + this.tableName + ' f, `dbo.country` c where f.country = c.id ORDER BY episodeCurrent DESC'

        return new Promise((resolve, reject) => {
          connection.query(query, async (error, results) => {
            if(error) reject(new EntityError("Cannot get films data"));
              
            let films = results;
            const filmsPromise = films.map(async (f) => {
                let queryCate =
                    'SELECT categoryName FROM `dbo.film_category` fc, `dbo.category` c WHERE fc.categoryId = c.id AND fc.filmId = ' + f.id
        
                return new Promise((resolveCategories, rejectCategories) => {
                    connection.query(queryCate, (err, categoriesRes) => {
                        if(err) rejectCategories(new EntityError("Cannot get films data"));

                        if (Array.isArray(categoriesRes) && categoriesRes.length > 0) {
                            let categories = categoriesRes.map((c) => c.categoryName);
                            f.slug = f.slug.trim();
                            f.rated = (Math.random() * 10).toFixed(1);
                            f.categories = categories;
                            resolveCategories(f);
                        } else {
                        resolveCategories(f);
                        }
                    });
                });
            });
    
            const filmsData = await Promise.all(filmsPromise);
            if(!filmsData) reject(new EntityError("Cannot get films data"));

            resolve(filmsData);
          });
        });
    };
    
    static createFilm = async (data) => {
        if(!Object.keys(data).length) throw new EntityError("Can not get film data");
        const status = data.status ? 1 : 0
        const episodeTotal = data.episodeTotal ? data.episodeTotal : null
        const categories = data.categories
        const query = `
            INSERT INTO ${this.tableName} (
                \`filmName\`
                ,\`originName\`
                ,\`status\`
                ,\`thurmUrl\`
                ,\`trailerUrl\`
                ,\`posterUrl\`
                ,\`episodeTotal\`
                ,\`timeUNE\`
                ,\`released\`
                ,\`viewCount\`
                ,\`slug\`
                ,\`director\`
                ,\`country\`
                ,\`part\`
                ,\`seriesId\`
                ,\`description\`)
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?
            )`
        
        const values = [
            data.filmName,
            data.originName,
            status,
            data.thumbUrl,
            data.trailerUrl,
            data.posterUrl,
            episodeTotal,
            data.timeUNE,
            data.released,
            data.slug,
            data.director,
            data.country,
            data.part,
            data.series,
            data.description
        ];

        return new Promise(async (resolve, reject) => {
            connection.query(query, values, (err, results) => {
                if(err) reject(new EntityError("Can not get films data"));

                const filmId = results.insertId;
                resolve(new Promise(async (resolveCategories, rejectCategories) => {
                    categories.map(async (category) => {
                        await connection.query(`INSERT INTO \`dbo.film_category\`(filmId, categoryId) VALUES(${filmId}, ${category})`, (err) => {
                            if(err) rejectCategories(new EntityError("Create Categories of film failed"));
                        })
                    })
                    resolve(`${data.filmName} film`+ ' was created')
                    addNotification(`${data.filmName} film`, 'was created')
                }))
            })
        })
    }
    
    static getFilmEdit = async (id) => {
        if (!id) throw new EntityError("Invalid film ID");
        return new Promise(async (resolve, reject) => {
            let checkResult = await checkValidId(id, this.tableName);
            if (checkResult == 2) { 
                const query =
                    `SELECT filmName, originName, status, thurmUrl, posterUrl, trailerUrl, episodeCurrent, episodeTotal, timeUNE, released, director , country , part, seriesId, description  FROM  ${this.tableName} where id = ` +
                    id;

                const queryCate =
                    'SELECT categoryName FROM `dbo.film_category` fc, `dbo.category` c WHERE fc.categoryId = c.id AND fc.filmId = ' + id;
                const queryGetSeriId = 'SELECT seriesId FROM `dbo.film` WHERE id = ' + id;

                connection.query(queryGetSeriId, (err, seriId) => {
                    if (err) reject('Have an error: ' + err.message);
                    const seriesId = seriId[0].seriesId;

                    const querySeries = `SELECT id, part FROM ${this.tableName} WHERE seriesId = ${seriesId} ORDER BY released`;

                    connection.query(querySeries, (err, seriesRes) => {
                        if (err) reject('Have an error: ' + err.message);
                        const series = seriesRes;

                        connection.query(queryCate, (err, categoriesRes) => {
                            if (err) reject('Have an error: ' + err.message);
                            const categories = categoriesRes.map((c) => c.categoryName);

                            connection.query(query, (err, result) => {
                                if (err) reject('Have an error: ' + err.message);
                                const film = result[0];
                                film.categories = categories;
                                film.series = series;
                                resolve(film);
                            });
                        });
                    });
                });
            } else if (checkResult == 1) {
                return reject(new EntityError('Id not exists'));
            } else {
                return reject(new EntityError('Id not valid'));
            }
        });
    }
    
    static updateFilm = async (data) => {
        const status = data.status ? 1 : 0;
        const episodeTotal = data.episodeTotal ? data.episodeTotal : null;
        const categories = data.categories;
        const query = `UPDATE \`dbo.film\`
            SET \`filmName\` = N'${data.filmName}',
                \`originName\` = N'${data.originName}',
                \`status\` = ${status},
                \`thurmUrl\` = '${data.thumbUrl}',
                \`trailerUrl\` = '${data.trailerUrl}',
                \`posterUrl\` = '${data.posterUrl}',
                \`episodeTotal\` = ${episodeTotal},
                \`timeUNE\` = N'${data.timeUNE}',
                \`released\` = '${data.released}',
                \`slug\` = '${data.slug}',
                \`director\` = N'${data.director}',
                \`part\` = N'${data.part}',
                \`seriesId\` = ${data.series},
                \`country\` = ${data.country},
                \`description\` = N'${data.description}'
        WHERE id=${data.id}`;

        const queryCF = `SELECT categoryId FROM \`dbo.film_category\` WHERE filmId = ${data.id}`;

        return new Promise(async (resolve, reject) => {
            connection.query(queryCF, async (err, result) => {
                if (err) {
                    reject(new EntityError('Have an error: ' + err.message));
                    return;
                }

                const resultId = result.map((c) => c.categoryId);

                const categoriesToRemove = resultId.filter((c) => !categories.includes(c));
                const categoriesToAdd = categories.filter((c) => !resultId.includes(c));

                if (categoriesToRemove.length > 0) {
                    const removeQuery = `DELETE FROM \`dbo.film_category\` WHERE filmId = ${data.id} AND categoryId IN (${categoriesToRemove.join(",")})`;
                    await connection.query(removeQuery);
                }

                if (categoriesToAdd.length > 0) {
                    const addQuery = `INSERT INTO \`dbo.film_category\` (filmId, categoryId) VALUES ${categoriesToAdd
                        .map((category) => `(${data.id}, ${category})`)
                        .join(", ")}`;
                    await connection.query(addQuery);
                }

                connection.query(query, (err, result) => {
                    if (err) {
                        reject(new EntityError('Have an error: ' + err.message));
                        return;
                    }

                    addNotification(`Film ${data.filmName}`, 'was updated');
                    resolve(true);
                });
            });
        });
    };
    
    static deleteFilm = async (id) => {
        let checkResult = await checkValidId(id, this.tableName);
        if (checkResult === 2) {
            const queryCF = `DELETE FROM \`dbo.film_category\` WHERE filmId = ${id}`;
            const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

            return new Promise((resolve, reject) => {
                connection.query(queryCF, (err, result) => {
                    if (err) {
                        reject(new EntityError('Have an error: ' + err.message));
                        return;
                    }

                    connection.query(query, (err, result) => {
                        if (err) {
                            reject(new EntityError('Have an error: ' + err.message));
                            return;
                        }

                        addNotification('A film', 'was deleted');
                        resolve(true);
                    });
                });
            });
        } else if (checkResult === 1) {
            return new EntityError('Id not exists');
        } else {
            return new EntityError('Id not valid');
        }
    }
    
    static lookingFilms = async (keyword) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT f.id, filmName, originName, thurmUrl, posterUrl, trailerUrl, slug, status, episodeCurrent, episodeTotal, released, countryName 
                           FROM ${this.tableName} f, \`dbo.country\` c 
                           WHERE f.country = c.id 
                           AND (f.filmName LIKE ? OR f.originName LIKE ? )`;
            
            connection.query(query, [`%${keyword}%`, `%${keyword}%`], (err, result) => {
                if (err) {
                    reject(new EntityError('Have an error: ' + err.message));
                    return;
                }

                const filmsPromise = result?.map(f => {
                    let queryCate = 'SELECT categoryName FROM `dbo.film_category` fc, `dbo.category` c WHERE fc.categoryId = c.id AND fc.filmId = ?';
                    
                    return new Promise((resolve, reject) => {
                        connection.query(queryCate, [f.id], (err, categoriesRes) => {
                            if (err) {
                                reject(new EntityError('Have an error: ' + err.message));
                                return;
                            }

                            let categories = categoriesRes?.map(c => c.categoryName) || [];
                            f.slug = f.slug.trim();
                            f.rated = (Math.random() * 10).toFixed(1);
                            f.categories = categories;
                            resolve(f);
                        });
                    });
                });

                Promise.all(filmsPromise)
                    .then((films) => resolve(films))
                    .catch((error) => reject(error));
            });
        });
    }
}

module.exports = FilmModel