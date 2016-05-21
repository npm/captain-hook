exports.up = function (knex) {
  return knex.schema
    .createTable('subscriptions', function(t) {
      t.increments('id');
      t.integer('user_id').notNullable().references('id').inTable('users');
      t.string('hook_id').notNullable();
      t.string('type').notNullable();
      t.string('name').notNullable();
      t.string('event');
      t.dateTime('date_created');
    });
};

exports.down = function (knex) {
  return knex.schmea
    .dropTable('subscriptions');
};
