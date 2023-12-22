const Admin = require("../models/adminModel");

module.exports = {
  setNavbarData: async(req, res, next) => {
    try {
      let admindata = req.cookies.admin ? await Admin.findById(req.cookies.admin.id) : ''
      res.locals.cookData = {
        admin: admindata,
      };
      next();
    } catch (error) {
      console.log(error.message);
    }
  },
};
