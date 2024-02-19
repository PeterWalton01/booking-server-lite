const pool = require("./pool");
// const pgp = require("pg-promise")({ capSQL: true });

/*
 * Get a list of physios
 * @return {object|null}  [object containing the physio detail]
 */
const read = () => pool('physios').select("*")
//pool.query("SELECT * FROM physios");

module.exports = {
  read,
};
