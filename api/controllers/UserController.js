/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
  /**
   * this is used to authenticate user to our api using either email and password
   * POST /login
   * @param req
   * @param res
   */

  login: function(req, res) {
    /**
     * this is param checking if they are provided
     */
    if (!_.has(req.body, "username") || !_.has(req.body, "password")) {
      return res.serverError("No field should be empty.");
    }

    /**
     * check if the username matches any email or phoneNumber
     */
    User.findOne({
      username: req.body.username
    }).exec(function callback(err, user) {
      if (err) return res.serverError(err);

      if (!user) return res.serverError("User not found, please sign up.");

      //check password
      bcrypt.compare(req.body.password, user.password, function(
        error,
        matched
      ) {
        if (error) return res.serverError(error);

        if (!matched) return res.serverError("Invalid password.");

        // secret to take in separate file
        var token = jwt.sign(JSON.parse(JSON.stringify(user)), "KEYSECRET", {
          expiresIn: "1d"
        });

        //return the token here
        res.ok(token);
      });
    });
  },
  test: function(req, res) {
    res.ok({
      test: "tested"
    });
  }
};
