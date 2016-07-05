const BaseModel = require('../../lib/base_model');

const instanceProps = {
  tableName: 'subscriptions',
  user: function () {
    return this.belongsTo(require('../users/model'));
  }
};

const classProps = {
  typeName: 'subscriptions',
  filters: {},
  relations: [
    'user'
  ]
};

module.exports = BaseModel.extend(instanceProps, classProps);
