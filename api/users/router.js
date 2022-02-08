const {
  getAllUsers,
  insertUser,
  getUserByUsername
} = require('./model')

const md = require('../middleware/middleware.js')

const express = require('express')

const router = express.Router()
let session

router.get('/', async (req, res) => {
  res.json(await getAllUsers())
})

router.post('/', md.validateRegister, async (req, res) => {
   try{
    const user = await insertUser(req.body)
    res.status(201).json(user)
   } catch (error) {
    res.status(500).json(error)
   }
})

router.post('/login', md.validateLogin, async (req, res) => {
  try{
    const {username, password, user_id} = await getUserByUsername(req.body.username)
    if(req.body.username == username && req.body.password == password){
      session=req.session;
      req.session.loggedIn = true
      req.session.username = username
      session.user={username, user_id}
      console.log(req.session)
      const Authorization = { ...req.body, token: '0sdVWfS7sBkd87A'}
      res.status(201).json(Authorization)    }
    else {
        res.send('Invalid username or password');
    }
   } catch (error) {
    res.status(500).json(error)   
  }
})

module.exports = router