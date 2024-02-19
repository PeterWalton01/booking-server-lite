const { create, readById, readByUsername } = require("../models/users");
const bcrypt = require("bcrypt");
const { now } = require("../utils/utils");

/*
 * register user - the account is identified by
 * the specified username and the password provided
 * will be encrypted before storage
 * @author Peter Walton
 * @param  {req, res}        [middleware parameters]
 * @return {status|message}  [status and message]
 */
const registerUser = async (req, res) => {
  try {
    // check username is new
    const chkUser = await getUserByUsername(req.body.user_name);
    if (chkUser) {
      res
        .status(409)
        .send({ success: false, message: "Username already in use" });
      throw new Error("Username already in use");
    }

    // salt and hash the provided password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const timestamp = now();
    // form the user object
    const user = {
      user_name: req.body.user_name,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      creation_date: timestamp,
      last_access: timestamp,
      password: hashedPassword,
  };

    // create the user
    await create(user);
    res.status(201).send({ success: true, message: "Username registered" });
    return;
  } catch (e) {
    console.error(e.message);
    res.status(500).end();
  }
};

/*
 * get the user detail for the specified id
 *
 * @author Peter Walton
 * @param  {id}              [id of user to find]
 * @return {object|message}  [object containing user details]
 */
const getUserById = async (id) => {
  try {
    // attempt to get user and make
    // appropriate return
    const response = await readById(id);
    if (response.length > 0) {
      return response[0];
    } else {
      return false;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
};

/*
 * get the user detail for the specified
 *
 * @author Peter Walton
 * @param  {Username}           [Username of user to find]
 * @return {object|message}  [object containing user details]
 */
const getUserByUsername = async (user_name) => {
  try {
    // attempt to get user and make
    // appropriate return
    const response = await readByUsername(user_name);
    if (response.length > 0) {
      return response[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
};

module.exports = { getUserById, getUserByUsername, registerUser };
