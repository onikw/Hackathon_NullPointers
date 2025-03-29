const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const mainRoute = require('./routes/mainRoute')
app.use('/', mainRoute)


app.listen(5555, () => {
    console.log('listening on port 5555...')
})
