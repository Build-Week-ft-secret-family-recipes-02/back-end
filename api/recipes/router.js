const {
  getAllRecipes,
  insertRecipe,
  deleteRecipe,
  getRecipeBy,
  updateRecipe
  } = require('./model')
  
  const express = require('express')
  
  const router = express.Router()
  
  router.get('/', async (req, res) => {
    res.json(await getAllRecipes())
  })
  /* http --pretty='none' :9000/api/recipes '*/
  
  router.post('/', async (req, res) => {
    res.status(201).json(await insertRecipe(req.body))
  })
    /*http --pretty='none' :9000/api/recipes 'instructions'='boil turnips' 'category'='soup' 'source'='cousin Tournippe' 'title'='turnip soupe' 'user_id':=11 */

  router.delete('/:recipe_id', async (req, res) => {
    const recipe_id = Number(req.params.recipe_id)
    const recipe = await getRecipeBy(recipe_id)
    await deleteRecipe(recipe_id)
      res.status(200).json(recipe)
  })
  /* http --pretty='none' DELETE :9000/api/recipes/11 */
  router.put('/', async (req, res) => {
    const recipe = req.body

    const updatedRecipe = await updateRecipe(recipe)
      res.status(200).json(updatedRecipe)
  })
    /*http --pretty='none' PUT :9000/api/recipes 'recipe_id':=11 'instructions'='boil turnips' 'category'='soup' 'source'='cousin Tournippe' 'title'='turnip soupe' 'user_id':=11 */

  module.exports = router