exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (t) {
      t.increments('id');
      t.string('slack-user-id').notNullable();
      t.string('slack-team-id').notNullable();
      t.string('npm-token-hashed');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('users');
};
