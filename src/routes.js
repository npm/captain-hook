module.exports = {
  ping: require('./ping'),
  subscriptions: {
    create: require('./resources/subscriptions/routes/create')
  }
};
