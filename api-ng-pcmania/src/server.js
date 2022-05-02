require('./config/config')
const express = require('express')
const app = express()

const routes = require('./routes/index.routes')

// Initialize database
global.db = require('./config/db')

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization") // añadido 'Authorization' a causa de error cors con el token
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json({ limit: '50mb' }))

// parse files
app.use(express.urlencoded({extended: true, limit: '50mb'}))

// public static folder
app.use('/public/images', express.static(__dirname + '/public/images/'))

// specify routes
app.use('', routes)

app.get('/', function(req, res){
    res.json('Api Pc-mania v1.0')
})

// app listen
app.listen(process.env.PORT, () => 
{
    console.log('Listening on http://localhost:' + process.env.PORT)
})