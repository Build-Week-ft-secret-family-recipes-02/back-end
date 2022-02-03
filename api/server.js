const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/router')
const recipesRouter = require('./recipes/router')



const server = express()
server.use(express.json())
server.use(helmet())



server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/recipes', recipesRouter)

server.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to family secret recipe book'})
})

module.exports = server
