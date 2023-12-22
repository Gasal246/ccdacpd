const { verifyOtp } = require("../helpers/verification");
const Admin = require("../models/adminModel");

module.exports = {
  verifyAdmin: async (req, res) => {
    try {
        const aid = req.params.id
        const admin = await Admin.findById(aid)
        res.render('pages/verify', { admin })
    } catch (error) {
      let on = "Verify page processing";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },
  verify: async (req, res) => {
    try {
        const aid = req.params.id
        await Admin.findByIdAndUpdate(aid, {verify: true})
        return res.json({success: "verification successfull"})
    } catch (error) {
      let on = "Verify page verification process";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  }
};
