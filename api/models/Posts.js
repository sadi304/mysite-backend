/**
 * Posts.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: { 
      type: "string", 
      required: true, 
    },
    body: { 
      type: "string",
      columnType: "text", 
      required: true,
    },
    owner: {
      model: 'user'
    }
  }
};
