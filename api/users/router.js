const {
  getAllUsers,
  insertUser,
  
} = require('./model')

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await getAllUsers())
})
// http --pretty='none' :9000/api/users

router.post('/', async (req, res) => {
   try{
    const user = await insertUser(req.body)
    res.status(201).json(user)
   } catch (error) {
    res.status(500).json(error)
   }
})
// http --pretty='none' :9000/api/users username='username10' password='password10'
router.post('/login', async (req, res) => {
  res.status(201).json(req.body)
})

module.exports = router