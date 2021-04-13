const auth = require("../../../auth");

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        // comprobar token
        const owner = req.body.id;
        auth.check.own(req, owner);
        next();
        break;
      case "follow":
        // comprobar token
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
};