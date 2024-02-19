const pool = require("./pool");
// const pgp = require("pg-promise")({ capSQL: true });
/*
 * Get a list of treatments.
 * @return {object|null}  [object containing the treatments]
 */
const read = () => pool('treatments').select("*")
// pool.query("SELECT * FROM treatments");

module.exports = {
  read,
};
