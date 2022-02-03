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
   res.status(201).json(req.body)
   try{
    const user = await insertUser(req.body)
    res.status(201).json(user)
   } catch (error) {
    res.status(500).json(error)
   }
})

router.post('/login', async (req, res) => {
  res.status(201).json(req.body)
})

module.exports = router