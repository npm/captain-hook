module.exports = {
  ping: require('./ping'),
  subscriptions: {
    slack: require('./resources/subscriptions/routes/slack')
  }
};
