'use strict';

const connection = require('../dbs/mysql.db');
const { checkValidId } = require('../controllers/staticFuture');
const { EntityError } = require('../middlewares/error.response');
const { addNotification } = require('./notify.model.js');

class CategoryModel {

    static tableName = '`dbo.category`'

    constructor () {
        connection.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
            \`id\` tinyint(4) DEFAULT NULL,
            \`categoryName\` varchar(17) DEFAULT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    }

    static getAllCategory = () => {
        const query = `SELECT id, categoryName FROM ${this.tableName} ORDER BY categoryName ASC`
    
        return new Promise(async (resolve, reject) => {
            await connection.query(query, (err, results) => {
                if(err) reject(new EntityError('Get all categories failed'))
                
                resolve(results)
            })
        })
    }
    
    static getCategoriesByFilm = async (id) => {
        return new Promise(async (resolve, reject) => {
            let checkResult = await checkValidId(id, '`dbo.film`');
            if (checkResult === 2) {
                const query = 'SELECT categoryId FROM `dbo.film_category` WHERE filmId = ?';
                connection.query(query, [id], (err, results) => {
                    if (err) {
                        reject(new EntityError('Get categories by film failed'));
                    } else {
                        const categoryIds = results.map((c) => c.categoryId);
                        resolve(categoryIds);
                    }
                });
            } else if (checkResult === 1) {
                return new EntityError('Id not exists');
            } else {
                return new EntityError('Id not valid');
            }
        });
    }
    
    static createCategory = async (data) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO \`dbo.category\` ([categoryName])
            VALUES (?)`;
            const values = [data.categoryName];
    
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(new EntityError('Failed to create category'));
                } else {
                    addNotification(`Category ${data.categoryName}`, 'was created')
                    resolve("Category created successfully");
                }
            });
        });
    }
    
    static getCategoryEdit = async (id) => {
        return new Promise(async (resolve, reject) => {
            let checkResult = await checkValidId(id, this.tableName);
            if (checkResult === 2) {
                const query = `SELECT categoryName FROM ${this.tableName} WHERE id = ?`;
                connection.query(query, [id], (err, results) => {
                    if (err) {
                        reject(new EntityError('Have an error: ' + err.message));
                    } else {
                        resolve(results[0]);
                    }
                });
            } else if (checkResult === 1) {
                reject(new EntityError('Id not exists'));
            } else {
                reject(new EntityError('Id not valid'));
            }
        });
    }
    
    static updateCategory = async (data) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.tableName}
            SET categoryName = ?
            WHERE id = ?`;
            const values = [data.categoryName, data.id];

            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(new EntityError('Failed to update category'));
                } else {
                    addNotification(`Category ${data.categoryName}`, 'was updated');
                    resolve(result.affectedRows);
                }
            });
        });
    }
    
    static deleteCategory = async (id) => {
        return new Promise(async (resolve, reject) => {
            let checkResult = await checkValidId(id, this.tableName);
            if (checkResult === 2) {
                const query = `DELETE FROM category WHERE id = ?`;
                
                connection.query(query, [id], (err, result) => {
                    if (err) {
                        reject(new EntityError('Failed to delete category'));
                    } else {
                        addNotification('A category', 'was deleted');
                        resolve(result.affectedRows);
                    }
                });
            } else if (checkResult === 1) {
                reject(new EntityError('Id not exists'));
            } else {
                reject(new EntityError('Id not valid'));
            }
        });
    }
}

module.exports = CategoryModel