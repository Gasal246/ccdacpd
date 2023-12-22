const Data = require("../models/dataModel");

module.exports = {
  processPdf: async (req, res) => {
    try {
        const uid = req.params.id
        const data = await Data.findById(uid)
        console.log(data);
        res.render('pages/pdf-template', {data,})
    } catch (error) {
      let on = "Adding a new administrator";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },
};
