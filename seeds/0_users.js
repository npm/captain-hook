exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').insert({
      'slack-user-name': 'ag_dubs',
      'npm-user-name': 'ag_dubs'
    })
  );
};
