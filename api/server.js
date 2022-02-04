const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/router')
const recipesRouter = require('./recipes/router')
const { Pool, Client } = require('pg')
const pgSession  = require('connect-pg-simple');

class pgService extends Pool{
  constructor(...args){
    super(...args)
    this.connectionString = process.env.DATABASE_URL
    this.ssl = {
      rejectUnauthorized: false
    }
  }
  sessionHandler(session) {
    const pgs = pgSession(session);
    return new pgs({
      conString: process.env.DATABASE_URL,
      pool: this.pool,
      schemaName: 'public',
      tableName: 'session',
    });
  }
}

const server = express()
server.use(express.json())
server.use(helmet())

const pgServe = new pgService()

const sess = {
  store: pgServe.sessionHandler(session),
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  unset: 'destroy',
  cookie: {
    sameSite: 'Lax',
    maxAge: 36000,
    secure: true
  }
}

if (process.env.NOD_ENV === 'production') {
  server.set('trust proxy', 1) 
  sess.cookie.secure = true 
}

server.use(session(sess));

server.use(cors())

server.options('*', cors())

server.use('/api/users', usersRouter)
server.use('/api/recipes', recipesRouter)

server.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to family secret recipe book'})
})

module.exports = server
