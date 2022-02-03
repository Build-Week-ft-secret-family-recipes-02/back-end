const {
    getAllRecipes,
    insertRecipe,
    
  } = require('./model')
  
  const express = require('express')
  
  const router = express.Router()
  
  router.get('/', async (req, res) => {
    res.json(await getAllRecipes())
  })
  /*http --pretty='none' :9000/api/recipes 'instructions'='boil turnips' 'category'='soup' 'originator'='cousin Tournippe' 'title'='turnip soupe' 'user_id':=11 */
  
  router.post('/', async (req, res) => {
    res.status(201).json(await insertRecipe(req.body))
  })
  
  
  module.exports = router