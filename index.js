const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const myData = require('./data.json')
const PORT = process.env.PORT || 9000
const fetch = require('isomorphic-fetch')

//different routes
const routerMovies = express.Router()
const routerSeries = express.Router()
const routerTrailer = express.Router()

let keys
if (process.env.NODE_ENV === 'production') {
  keys = process.env
} else {
  keys = require('./keys.json')
}


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.options(/(.*)/, (req, res, next) => {
  res.sendStatus(200) // Always respond OK on OPTIONS requests.
})

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')))

app.get("/", (req,res)=>{
  res.send("hello world")
})

// Serve static assets


app.use('/api', routerMovies)
app.use('/api', routerSeries)
app.use('/api', routerTrailer)

routerMovies.route('/movies').get((req,res)=>{
  const {language,page} = req.query
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.MOVIEKEY}&language=en-US&page=${page}`)
            .then(res=>res.json())
            .then(json=>res.send(json))
})

routerSeries.route('/TVShows').get((req,res)=>{
  const {language,page} = req.query
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${keys.MOVIEKEY}&language=en-US&page=${page}`)
            .then(res=>res.json())
            .then(json=>res.send(json))
})

routerTrailer.route('/trailer').get((req,res)=>{
  const {part, q} = req.query
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${keys.APIKEYYOUTUBE}&q=${q}%20trailer`)
            .then(res=>res.json())
            .then(json=>res.send(json))
})



app.listen(PORT, function () {
  console.log(`API running on PORT ${PORT}`)
})




/*
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-eslint": "^8.2.3",
    "body-parser": "^1.18.2",
    "eslint": "^4.19.1",
    "eslint-config-standard": "^11.0.0",
    "eslint-config-standard-react": "^6.0.0",
    "eslint-plugin-import": "^2.11.0",
    "eslint-plugin-node": "^6.0.1",
    "eslint-plugin-promise": "^3.7.0",
    "eslint-plugin-react": "^7.7.0",
    "eslint-plugin-react-native": "^3.2.1",
    "eslint-plugin-standard": "^3.0.1",
    "express": "^4.16.3",
    "isomorphic-fetch": "^2.2.1",
    "mongoose": "^5.0.15",
    "path": "^0.12.7"
  }
}

*/









/*
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const myData = require('./data.json')
const PORT = process.env.PORT || 9000
const fetch = require('isomorphic-fetch')

let keys
let YELP_KEY
if (process.env.NODE_ENV === 'production') {
  YELP_KEY = process.env.YELP_KEY
} else {
  keys = require('./keys.json')
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.options(/(.*)/, (req, res, next) => {
  res.sendStatus(200) // Always respond OK on OPTIONS requests.
})

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')))

app.get("/", (req,res)=>{
  res.send("hello world")
})

app.get("/players", (req,res)=>{
  console.log(req)
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.MOVIEKEY}&language=en-US&page=1`)
            .then(res=>res.json())
            .then(json=>res.send(json))
  // res.send(myData)
})



app.listen(PORT, function () {
  console.log(`API running on PORT ${PORT}`)
})

*/