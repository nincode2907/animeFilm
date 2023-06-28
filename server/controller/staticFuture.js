
const mssql = require('../db.js')

const checkValidId = async (id, table) => {
    id = parseInt(id)
    if(!isNaN(id) && id > 0) {
        const queryCheckId = `SELECT COUNT(*) AS count FROM ${table} WHERE id = ${id}`;
        const result = await mssql.query(queryCheckId);

        if(result.recordset[0].count) 
            return 2;
        else 
            return 1;
    }
    return 0;
}

module.exports = {
    checkValidId
}