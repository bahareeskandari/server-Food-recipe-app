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


app.get("/", (req,res)=>{
  res.send("hello world")
})

app.get("/players", (req,res)=>{
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.MOVIEKEY}&language=en-US&page=1`)
            .then(res=>res.json())
            .then(json=>res.send(json))
  // res.send(myData)
})



app.listen(PORT, function () {
  console.log(`API running on PORT ${PORT}`)
})
