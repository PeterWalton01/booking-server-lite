const pool = require("./pool");
// const pgp = require("pg-promise")({ capSQL: true });

/*
 * Get all appointments
 * @author Peter Walton
 * @return {object|null}  [object containing the appointments]
 */
const read = () => pool.select('*')
                       .from('appointments')
                       .orderByRaw('start_datetime')

  // pool.query("SELECT * FROM appointments ORDER BY start_datetime");

/*
 * Get a specified appointment by id
 * @author Peter Walton
 * @param {id}            [id of appointment to get]
 * @return {object|null}  [object containing the product]
 */
const readById = (id) => pool('appointments')
                         .where('appointment_id', id)
                         .select("*")
  // pool.query("SELECT * FROM appointments WHERE appointment_id = $1", [id]);

/*
 * Get a appointments for a client
 * @author Peter Walton
 * @param {client_name}   [name of client]
 * @return {object|null}  [object containing the appointments]
 */
const readByClientName = (client_name) => pool.select('*')
                         .from('appointments')
                         .where('client_name', client_name)
                         .orderByRaw('start_datetime')
  // pool.query(
  //   "SELECT * FROM appointments WHERE client_name = $1  ORDER BY start_datetime",
  //   [client_name]
  // );

/*
 * Get a appointments for client beyond a given date
 * @author Peter Walton
 * @param {client_name}   [name of client]
 * @param {datetime}   [name of client]
 * @return {object|null}  [object containing the appointments]
 */
const readByClientNameAndDate = (client_name, datetime) => 
                              pool.select("*")
                              .from('appointments')
                              .where('client_name', client_name)
                              .where('start_datetime', ">=", datetime)
                              .orderByRaw('start_datetime')    
  // pool.query(
  //   "SELECT * FROM appointments WHERE client_name = $1 and start_datetime >= $2  ORDER BY start_datetime",
  //   [client_name, datetime]
  // );

/*
 * Get a appointments from a specified date
 * @author Peter Walton
 * @param {datetime}   [date/date-time to use]
 * @return {object|null}  [object containing the appointments]
 */
const readByDate = (datetime) => 
                              pool.select("*")
                                .from("appointments")
                                .where('start_datetime', ">=",
                                   datetime)
                                .orderByRaw('start_datetime') 
  // pool.query(
  //   "SELECT * FROM appointments WHERE start_datetime >= $1  ORDER BY start_datetime",
  //   [datetime]
  // );

/*
 * Get a appointments for physio
 * @author Peter Walton
 * @param {physio_name}   [name of physio]
 * @return {object|null}  [object containing the appointments]
 */
const readByPhysio = (physio_name) =>
                        pool.select("*")
                        .from("appointments")
                        .where("physio_name", physio_name)
                        .orderByRaw('start_datetime') 
  // pool.query(
  //   "SELECT * FROM appointments WHERE physio_name = $1  ORDER BY start_datetime",
  //   [physio_name]
  // );

/*
 * Get a appointments for physio beyond a given date
 * @author Peter Walton
 * @param {physio_name}   [name of physio]
 * @param {datetime}   [date/date-time to use]
 * @return {object|null}  [object containing the appointments]
 */
const readByPhysioAndDate = (physio_name, datetime) =>
                                pool.select("*")
                                .from("appointments")
                                .where("physio_name", physio_name)
                                .where('start_datetime', ">=",
                                  datetime)
                                .orderByRaw('start_datetime') 

  // pool.query(
  //   "SELECT * FROM appointments WHERE physio_name = $1 and start_datetime >= $2  ORDER BY start_datetime",
  //   [physio_name, datetime]
  // );

/*
 * Create new appointment
 * @author Peter Walton
 * @param {body}          [body containing the data to be inserted]
 * @return {object|null}  [object containing the product]
 */
const create = (body) => pool('appointments').insert(body)
// {
//   const insert =
//     pgp.helpers.insert(body, null, "appointments") + " RETURNING *";
//   return pool.query(insert);
// };

/*
 * Delete an appointment
 * @author Peter Walton
 * @param {id}            [id of appointment to be deleted]
 */
const deleteById = (id) => pool('appointments')
                           .where("appointment_id", id)
                           .del()
// {
//   pool.query("DELETE FROM appointments WHERE appointment_id = $1", [id]);
// };

/*
 * update a specified appointment
 * @author Peter Walton
 * @param  {id}           [id of appointment to update]
 * @param  {body}         [body containing the data for update]
 * @return {object|null}  [object from update]
 */
const update = (id, body) => {
  const update =
    pgp.helpers.update(body, null, "appointments") +
    ` WHERE appointment_id = ${id}`;
  pool.query(update);
};

/*
 * Get an appointment for overlap type I - new
 * appointment starts during existing appointment
 * @author Peter Walton
 * @param {physio_name}   [name of physio]
 * @param {datetime}   [data/date-time to use]
 * @return {object|null}  [object containing the appointments]
 */
const checkOverlapTypeI = (body) => 
                          pool.select("appointment_id")
                          .from("appointments")
                          .where("physio_name", body.physio_name)
                          .where("start_datetime", "<", 
                                 body.start_datetime)
                          .where("end_datetime", ">", 
                                 body.start_datetime)
  // pool.query(
  //   "SELECT appointment_id FROM appointments WHERE physio_name = $1  AND start_datetime < $2 AND end_datetime > $2",
  //   [body.physio_name, body.start_datetime]
  // );

/*
 * Get an appointment for overlap type II - new
 * appointment ends during an existing appointment
 * @author Peter Walton
 * @param {physio_name}   [name of physio]
 * @param {datetime}   [data/date-time to use]
 * @return {object|null}  [object containing the appointments]
 */
const checkOverlapTypeII = (body) =>
                            pool.select("appointment_id")
                            .from("appointments")
                            .where("physio_name", body.physio_name)
                            .where("start_datetime", "<", 
                                  body.end_datetime)
                            .where("end_datetime", ">", 
                                  body.end_datetime)
  // pool.query(
  //   "SELECT appointment_id FROM appointments WHERE physio_name = $1  AND start_datetime < $2 AND end_datetime > $2",
  //   [body.physio_name, body.end_datetime]
  // );

/*
 * Get an appointment for overlap type III - new
 * appointment covers an existing appointment
 * @author Peter Walton
 * @param {physio_name}   [name of physio]
 * @param {datetime}   [data/date-time to use]
 * @return {object|null}  [object containing the appointments]
 */

const checkOverlapTypeIII = (body) =>
                              pool.select("appointment_id")
                              .from("appointments")
                              .where("physio_name", body.physio_name)
                              .where("start_datetime", ">=", 
                                    body.start_datetime)
                              .where("end_datetime", "<=", 
                                    body.end_datetime)
  // pool.query(
  //   "SELECT appointment_id FROM appointments WHERE physio_name = $1  AND start_datetime >= $2 AND end_datetime <= $3",
  //   [body.physio_name, body.start_datetime, body.end_datetime]
  // );

module.exports = {
  read,
  readByClientName,
  readByClientNameAndDate,
  readByDate,
  readByPhysio,
  readByPhysioAndDate,
  create,
  deleteById,
  readById,
  update,
  checkOverlapTypeI,
  checkOverlapTypeII,
  checkOverlapTypeIII,
};
