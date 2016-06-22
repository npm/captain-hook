exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').insert({
      'slack-user-id': '666',
      'slack-team-id': '667'
    })
  );
};
