exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (t) {
      t.increments('id');
      t.string('password-hash');
      t.string('slack-user-name').notNullable();
      t.string('npm-user-name').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('users');
};
