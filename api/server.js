const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/router')
const recipesRouter = require('./recipes/router')



const server = express()
server.use(express.json())
server.use(helmet())

const corsOptions = {
    "origin": process.env.DATABASE_URL,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}

process.env.DATABASE_URL?null:server.use((req, res, next) =>{ console.log(req.header('Origin'));next()})

server.use(cors())

server.options('*', cors())

server.use('/api/users', usersRouter)
server.use('/api/recipes', recipesRouter)

server.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to family secret recipe book'})
})

module.exports = server
