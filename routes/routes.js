
const { json } = require('express')
const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const notesData = JSON.parse(data)

    app.get('/api/notes', function (req, res) {
      res.json(notesData)
    })

    app.post('/api/notes', function (req, res) {
      const createdNote = req.body
      const noteWithId = { ...createdNote, id: notesData.length + 1 }
      notesData.push(noteWithId)
      updateDb()
      res.json(req.body) 
      return console.log('Added new note: ' + createdNote.title)
    })

    
    app.get('/api/notes/:id', function (req, res) {
      res.json(notesData.get[req.params.id])
    })

    app.delete('/api/notes/:id', function (req, res) {
      const id = req.params.id
      const indexOfNote = notesData.findIndex((x) => x.id === parseInt(id))
      notesData.splice(indexOfNote, 1)
      updateDb()
      res.json(req.body.id) 
      console.log('Deleted note: ' + req.params.id)
    })

    app.get('/notes', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/notes.html'))
    })

    function updateDb() {
      fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), (err) => {
        if (err) {
          throw err;
        }

        return true
      })
    }
  })
}