const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser ')
const routes = require('./routes/routes')
const cors = require('cors')
const app = express()

mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost:27017/locali', { useNewUrlParser: true})
  .then(() => console.log('Connected to database.'))
  .catch(() => {
    console.log('Cannot connect to database. Exiting.')
    process.exit()
  }
)

app.use(cors())
app.use(bodyParser.json())
app.use((err, req, res, next) => { 
  res.status(422).send({ error: err._message })
})

module.exports = app