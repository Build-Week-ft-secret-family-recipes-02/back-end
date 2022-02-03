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
// http --pretty='none' :9000/api/users

router.post('/', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})
// http --pretty='none' :9000/api/users username='username10' password='password10'


module.exports = router