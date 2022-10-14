const express = require('express')
const app = express()
const cors = require('cors')
// Load Enviroment
const config = require('./config.js')
const PORT = config.PORT
const HOST = config.HOST
// Load redis
const db = require('./redis-functions')


db.dataInit();
app.use(express.static('public'))
app.use(cors())

// Get Data
app.get('/data', function (req, res) {
  db.getData()
    .then( data => {
      console.log(data)
      res.send(data)
    })
})

// Update Data
app.get('/update/:key/:value', function (req, res) {
  const key = req.params.key
  let value = Number(req.params.value)
  db.updateData(key, value).then( () => {
    db.getData()
      .then( data => {
        res.send(data)
      })
  })
})
app.listen(PORT, HOST, function() {
  console.log('Running at http://localhost:'+PORT)
})
