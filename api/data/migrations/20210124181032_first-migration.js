exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
     // users.timestamps(false, true)
    })

    await knex.schema
    .createTable('recipes', (recipes) => {
      recipes.increments('recipe_id')
      recipes.string('instructions', 200).notNullable()
      recipes.string('category', 200).notNullable()
      recipes.string('source', 200).notNullable()
      recipes.string('title', 200).notNullable()
      recipes.integer('user_id')
      recipes.timestamps(false, true)
    })
    await knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS session (
      sid varchar NOT NULL COLLATE "default",
      sess json NOT NULL,
      expire timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
    );
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON session ("expire");
    `)
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('session')
  await knex.schema.dropTableIfExists('recipes')
  await knex.schema.dropTableIfExists('users')
}
