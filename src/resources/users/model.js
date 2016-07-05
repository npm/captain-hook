const BaseModel = require('../../lib/base_model');

const instanceProps = {
  tableName: 'users',
  subscriptions: function() {
    return this.hasMany(require('../subscriptions/model'));
  }
};

const classProps = {
  typeName: 'users',
  filters: {},
  relations: [
    'subscriptions'
  ]
};

module.exports = BaseModel.extend(instanceProps, classProps);
