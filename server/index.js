const express = require('express')
const cors = require('cors')
const app = express()

const filmRoute =  require('./router/filmRoute')
const episodeRoute =  require('./router/episodeRoute')
const categoryRoute =  require('./router/categoryRoute')
const countryRoute =  require('./router/countryRoute')

const port = 8000

app.use(cors())
app.use(express.json())

app.use('/api/film/', filmRoute)
app.use('/api/episode/', episodeRoute)
app.use('/api/category/', categoryRoute)
app.use('/api/country/', countryRoute)

app.listen(port, () => console.log('listening on port http://localhost:' + port))