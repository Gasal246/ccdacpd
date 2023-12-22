const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports = {
  dologin: async (req, res) => {
    try {
      const admin = await Admin.findOne({ email: req.body.email });
      console.log(admin);
      if (admin) {
        if (!isBcryptHash(admin.password)) {
          // If password is not bcrypt hashed, compare directly
          if (req.body.password == admin.password) {
            const cdata = {
              id: admin._id,
              email: admin.email,
              name: admin.name,
            };
            res.cookie("admin", cdata, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            res.json({ status: true });
          } else {
            return res.json({ err: "Entered credentials not matching" });
          }
        } else {
          // If password is already bcrypt hashed, use bcrypt.compare
          if (await bcrypt.compare(req.body.password, admin.password)) {
            const cdata = {
              id: admin._id,
              email: admin.email,
              name: admin.name,
            };
            res.cookie("admin", cdata, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            res.json({ status: true });
          } else {
            return res.json({ err: "Entered credentials not matching" });
          }
        }
      } else {
        return res.json({ err: "Admin not found" });
      }
    } catch (error) {
      let on = "Performing Login";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },
  doLogout: (req, res) => {
    try {
      res.clearCookie("admin");
      res.json({ success: true });
    } catch (error) {
      let on = "Performing Logout";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },
};

function isBcryptHash(input) {
  const bcryptRegex = /^\$2[aby]\$\d+\$[./A-Za-z0-9]{53}$/;
  return bcryptRegex.test(input);
}
