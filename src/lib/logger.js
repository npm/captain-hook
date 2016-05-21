const bole = require("bole");
const logstring = require("common-log-string");

var logger = bole(process.env.SERVICE_NAME || 'hooks-bot');
bole.output({ level: 'info', stream: process.stdout });

module.exports = {
  logger: logger,
  logHandler: function logEachRequest(request, response, route, error) {
    logger.info(logstring(request, response));
  }
};
