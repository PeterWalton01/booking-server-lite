const express = require("express");
const appointmentsRouter = express.Router();

/*
 * routes associate with appointments
 */

const {
  getAllAppointments,
  getAppointmentsByClient,
  getAppointmentsByClientNameAndDate,
  getAppointmentsByDate,
  getAppointmentsByPhysio,
  getAppointmentsByPhysioAndDate,
  addAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controller/appointmentController");

const { checkAuthenticated } = require("./auth");

appointmentsRouter.get("/", checkAuthenticated, (req, res) => {
  getAllAppointments(req, res);
});

appointmentsRouter.get("/client/:name", checkAuthenticated, (req, res) => {
  getAppointmentsByClient(req, res);
});

appointmentsRouter.get(
  "/client/:name/fromdate/:date",
  checkAuthenticated,
  (req, res) => {
    getAppointmentsByClientNameAndDate(req, res);
  }
);

appointmentsRouter.get("/fromdate/:date", checkAuthenticated, (req, res) => {
  getAppointmentsByDate(req, res);
});

appointmentsRouter.get("/physio/:name", checkAuthenticated, (req, res) => {
  getAppointmentsByPhysio(req, res);
});

appointmentsRouter.get(
  "/physio/:name/fromdate/:date",
  checkAuthenticated,
  (req, res) => {
    getAppointmentsByPhysioAndDate(req, res);
  }
);

appointmentsRouter.post("/", checkAuthenticated, (req, res) => {
  addAppointment(req, res);
});

appointmentsRouter.put("/:id", checkAuthenticated, (req, res) => {
  updateAppointment(req, res);
});

appointmentsRouter.delete("/:id", checkAuthenticated, (req, res) => {
  deleteAppointment(req, res);
});

module.exports = { appointmentsRouter };
