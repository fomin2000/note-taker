const express = require('express')
const fs = require('fs')
const path = require('path') 


const app = express()
const PORT = process.env.PORT || 3001


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public'))) 

require('./routes/routes')(app)


app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`)
})