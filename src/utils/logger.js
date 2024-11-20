const { Logger } = require("logger");
const logger = new Logger("AppSync_Events", "myEventApp");
const metricUnits = Logger.METRIC_UNITS;
module.exports = { logger, metricUnits };
