// Setup empty JS object to act as endpoint for all routes
const appData = {}

// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, err => {
  if (err) {
    console.log('there was a problem', err)
    return
  }
  console.log(`Listening on ${PORT}`)
})

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('public'))
// Spin up the server

// Callback to debug

// Initialize all route with a callback function


// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(appData)
})

// Post Route  
const data = []

app.post('/comment', addComment)

function addComment(req, res) {
  console.log(req.body)
  data.push(req.body)
}
