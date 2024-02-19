const moment = require("moment");

/*
 * get string containing utc timestamp
 * @author Peter Walton
 * @return {String}  [required string]
 */
const now = () => {
  return moment.utc().toISOString();
};

module.exports = { now };
