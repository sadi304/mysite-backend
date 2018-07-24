/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  "*": "isAuthenticated",
  UserController: {
    login: true,
    create: true
  },
  PostsController: {
    find: true
  },
  PortfolioController: {
    find: true,
    create: true
  }
};
