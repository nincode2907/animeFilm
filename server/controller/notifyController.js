const mssql = require('../db.js')

const getAllNotification = (req, res) => {
    const query = `SELECT TOP 20 * FROM dbo.notify ORDER BY time DESC`

    mssql.query(query)
        .then((result) => res.json(result.recordset))
        .catch((err) => res.json('Have an error: ' + err.message))
}

const addNotification = (strongAction, action) => {
    const now = new Date().toISOString();
    const query = `INSERT INTO dbo.notify ([action], [strongOfAction], [time]) VALUES (N'${action}', N'${strongAction}', '${now}')`

    mssql.query(query)
        .then((result) => console.log(result.rowsAffected))
        .catch((err) => console.log('Have an error: ' + err.message))
}

module.exports = {
    getAllNotification,
    addNotification
}