const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fetch = require('isomorphic-fetch')

let keys
if (process.env.NODE_ENV === 'production') {
  keys = process.env
} else {
  keys = require('./keys.json')

}

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 9000

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

router.get('/', function (req, res) {
  res.send('Ready!')
})

app.use('/api', router)
app.listen(PORT, function () {
  console.log(`API running on PORT ${PORT}`)
})


  router.route('/Movies')
  .get((req, res) => {
    const {language,page} = req.query
    console.log(keys.MOVIEKEY)
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.MOVIEKEY}&language=en-US&page=${page}`).then(res => res.json()).then(response => {
      res.json(response)
    })
  })


  router.route('/TVShows')
  .get((req, res) => {
    const {language,page} = req.query
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${keys.MOVIEKEY}&language=en-US&page=${page}`).then(res => res.json()).then(response => {
      res.json(response)
    })
  })


  router.route('/trailer')
  .get((req, res) => {
    const {part, q} = req.query
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${keys.APIKEYYOUTUBE}&q=${q}%20trailer`).then(res => res.json()).then(response => {
      res.json(response)
    })
  })