const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {
  getUserByUsername,
  getUserById,
} = require("../controller/userController");
let user;

/*
 * Create function to initialize an implementation
 * of a local password. This defines a function to
 * authenticate a user based on user name and password.
 * It also introduced functions to serialize and
 * deserialize the specified user.
 * @author Peter Walton
 * @param {passport}            [passport to initialize]
 * @outcome  [callback function returned with appropriate values]
 */
function initialize(passport) {
  const authenticateUser = async (user_name, password, done) => {
    user = await getUserByUsername(user_name);

    if (user === false || typeof user === "undefined") {
      return done(null, false, { message: "No such username" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "user_name", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.user_id));
  // passport.deserializeUser((id, done) => {
  //   done(null, user);
  // });
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });
}
module.exports = initialize;
