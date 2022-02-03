const {
  getAllUsers,
  insertUser,
  updateUser
} = require('./model')

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await getAllUsers())
})

router.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

router.put('/api/users', async (req, res) => {
  res.status(200).json(await updateUser(req.body))
})

module.exports = router