const db = require('../data/db-config')

async function insertRecipe(recipe) {
  const [newRecipeObject] = await db('recipes')
    .insert(recipe, [
        'recipe_id', 
        'instructions', 
        'category',
        'originator', 
        'title', 
        'user_id'
    ])
  return newRecipeObject 
}

function getAllRecipes() { 
    return db('recipes') 
}

module.exports = {
    getAllRecipes,
    insertRecipe,
}