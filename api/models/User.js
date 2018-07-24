/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require("bcryptjs");

module.exports = {
  attributes: {
    username: {
      type: "string",
      required: true
    },
    password: {
      type: "string",
      minLength: 6,
      required: true,
      protect: true
    },
    posts: {
      collection: "posts",
      via: "owner"
    },
    portfolio: {
      collection: "portfolio",
      via: "owner"
    }
  },
  customToJSON: function() {
    var obj = this;
    delete obj.password;
    return obj;
  },
  beforeCreate: function(values, cb) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};
