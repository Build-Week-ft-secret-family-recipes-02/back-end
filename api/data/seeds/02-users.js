/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 11, username: 'username11', password: 'password11'},
        {user_id: 12, username: 'username12', password: 'password12'},
        {user_id: 13, username: 'username13', password: 'password13'}
      ]);
    });
};
