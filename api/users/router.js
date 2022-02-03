const {
  getAllUsers,
  insertUser,
  
} = require('./model')

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await getAllUsers())
})

router.post('/', async (req, res) => {
   try{
    const user = await insertUser(req.body)
    res.status(201).json(user)
   } catch (error) {
    res.status(500).json(error)
   }
})

router.post('/login', async (req, res) => {
  try{
    const Authorization = { ...req.body, token: '0sdVWfS7sBkd87A'}
    res.status(201).json(Authorization)
   } catch (error) {
    res.status(500).json(error)   
  }
})

module.exports = router