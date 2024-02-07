require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()

// init middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// init dbs
const sqldb = require('./dbs/mysql.db')
// init router
app.use('', require('./routers/'))

app.use((req, res, next) => {
    const err = new Error('Api not found')
    err.status = 404
    next(err)
})

//handler error
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        code: 'error',
        status: error.status || 500,
        message: error.message || 'An error occurred'
    })
})



module.exports = app