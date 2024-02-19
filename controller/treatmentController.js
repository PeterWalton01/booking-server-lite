const { read } = require("../models/treatments");
/*
 * Get all treatments using model layer. Handle any
 * errors. Send appropriate response.
 * @author Peter Walton
 * @return {data|message}  [object containing the treatments]
 */
const getAllTreatments = async (req, res) => {
  try {
    const response = await read();
    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};

module.exports = {
  getAllTreatments,
};
