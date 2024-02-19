const {
  read,
  readByClientName,
  readByClientNameAndDate,
  readByDate,
  readByPhysio,
  readByPhysioAndDate,
  readById,
  create,
  deleteById,
  update,
  checkOverlapTypeI,
  checkOverlapTypeII,
  checkOverlapTypeIII,
} = require("../models/appointments");
/*
 * Get all appointments using model layer. Handle any
 * errors. Send appropriate response.
 * @author Peter Walton
 * @return {data|message}  [object containing the appointments]
 */
const getAllAppointments = async (req, res) => {
  try {
    const response = await read();
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(290).send({
        success: false,
        message: "No appointments found",
      });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Get all appointments for a client using model layer. Handle any
 * errors. Send appropriate response.
 * @author Peter Walton
 * @input {req.params.name}  [name of client]
 * @return {data|message}  [object containing the appointments]
 */
const getAppointmentsByClient = async (req, res) => {
  try {
    // check validity of id
    const response = await readByClientName(req.params.name);
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(290).send({
        success: false,
        message: "No appointments found for that client",
      });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Get all appointments beyond a given datatime using
 * the model layer. Handle any errors. Send appropriate response.
 * @author Peter Walton
 * @input {req.params.date}  [datetime to use]
 * @return {data|message}  [object containing the appointments]
 */
const getAppointmentsByDate = async (req, res) => {
  try {
    // check validity of id
    const response = await readByDate(req.params.date);
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res
        .status(290)
        .send({ success: false, message: "No appointments found" });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Get all appointments for a client, later than a given
 * datetime using model layer. Handle any errors.
 * Send appropriate response.
 * @author Peter Walton
 * @input {req.params.name}  [name of client]
 * @input {req.params.date}  [datetime to use]
 * @return {data|message}  [object containing the appointments]
 */
const getAppointmentsByClientNameAndDate = async (req, res) => {
  try {
    // check validity of id
    const response = await readByClientNameAndDate(
      req.params.name,
      req.params.date
    );
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res
        .status(290)
        .send({ success: false, message: "Cannot find appointments" });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Get all appointments for a physio using model layer. Handle any
 * errors. Send appropriate response.
 * @author Peter Walton
 * @input {req.params.name}  [name of physio]
 * @return {data|message}  [object containing the appointments]
 */
const getAppointmentsByPhysio = async (req, res) => {
  try {
    // check validity of id
    const response = await readByPhysio(req.params.name);
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(290).send({
        success: false,
        message: "No appointments found for that physiotherapist",
      });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Get all appointments for a physio, later than a given
 * datetime using model layer. Handle any errors.
 * Send appropriate response.
 * @author Peter Walton
 * @input {req.params.name}  [name of physio]
 * @input {req.params.date}  [datetime to use]
 * @return {data|message}  [object containing the appointments]
 */
const getAppointmentsByPhysioAndDate = async (req, res) => {
  try {
    // check validity of id
    const response = await readByPhysioAndDate(
      req.params.name,
      req.params.date
    );
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res
        .status(290)
        .send({ success: false, message: "Cannot find appointments" });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Attempt to add a new appointment. Check that the new
 * appointment does not overlap with an existing appointment.
 * Send the details of the new appointment or a
 * message indicating a conflict.
 * @author Peter Walton
 * @input {req.body}  [the body from the POST request]
 * @return {data|message}  [object containing the response]
 */
const addAppointment = async (req, res) => {
  try {
    // check overlap
    const check1 = await checkOverlapTypeI(req.body);
    console.log(check1.length)
    if (check1.length > 0) {
      return res.status(404).send({
        status: false,
        message:
          "That would create an overlapping appointment. Please choose a new start time.",
      });
    }
    const check2 = await checkOverlapTypeII(req.body);
    console.log(check2.length)
    if (check2.length > 0) {
      return res.status(404).send({
        status: false,
        message:
          "That would create an overlapping appointment. Please choose a new start time.",
      });
    }
    const check3 = await checkOverlapTypeIII(req.body);
    console.log(check3.length)
    if (check3.length > 0) {
      return res.status(404).send({
        status: false,
        message:
          "That would create an overlapping appointment. Please choose a new start time.",
      });
    }

    // create new appointment
    const newAppointment = await create(req.body);
    console.log(newAppointment)
    res.status(201).send({success: true, message: 'Appointment created'});
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Attempt to delete an appointment for a given id.
 * First verify that the id exists.
 * Send an appropriate response.
 * @author Peter Walton
 * @input {req.params.id)}  [id of appointment to delete]
 * @return {data|message}  [object containing the response]
 */
const deleteAppointment = async (req, res) => {
  try {
    // validate id
    const chkId = await readById(req.params.id);
    if (chkId.length === 0) {
      res.status(290).send({ success: false, message: "No matching Id" });
      return;
    }

    // complete deletion
    const num = await deleteById(req.params.id);
    res.status(200).send({ success: true, message: "Appointment deleted" });
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};
/*
 * Not needed in first version of application.
 * INCOMPLETE.
 */
const updateAppointment = async (req, res) => {
  try {
    // validate id
    const chkId = await readById(req.params.id);
    if (chkId.length === 0) {
      res.status(290).send({ success: false, message: "No matching Id" });
      return;
    }

    // check for overlap

    // complete update
    update(req.params.id, req.body);
    res.status(200).send({ success: true, message: "Appointment updated" });
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentsByClient,
  getAppointmentsByClientNameAndDate,
  getAppointmentsByDate,
  getAppointmentsByPhysio,
  getAppointmentsByPhysioAndDate,
  addAppointment,
  deleteAppointment,
  updateAppointment,
};
