const db = require('../data/db-config')

async function insertRecipe(recipe) {
  const [newRecipeObject] = await db('recipes')
    .insert(recipe, [
        'recipe_id', 
        'instructions', 
        'category',
        'source', 
        'title', 
        'user_id'
    ])
  return newRecipeObject 
}

function getAllRecipes() { 
    return db('recipes') 
}

function getRecipeBy(recipe_id) { 
  return db('recipes').where({recipe_id})
}

function deleteRecipe(recipe_id) { 
  return db('recipes')
  .where({recipe_id})
  .del() 
}

function updateRecipe(recipe) {
  const recipe_id = Number(recipe.recipe_id)
  const {    
    instructions, 
    category,
    source, 
    title, 
    user_id
  } = recipe
  return db('recipes').where({recipe_id}).update({
    instructions, 
    category,
    source, 
    title, 
  },[
    'recipe_id', 
    'instructions', 
    'category',
    'source', 
    'title', 
    'user_id'])
}

module.exports = {
    getAllRecipes,
    insertRecipe,
    deleteRecipe,
    getRecipeBy,
    updateRecipe
}