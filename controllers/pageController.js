const Admin = require("../models/adminModel");
const Data = require("../models/dataModel");

module.exports = {
  loginPage: (req, res) => {
    try {
      res.render("pages/login");
    } catch (error) {
      console.log(error.message);
    }
  },
  indexPage: (req, res) => {
    try {
      res.render("pages/index");
    } catch (error) {
        let on = "Login page rendering"
        let msg = error.message
        res.redirect('/error?on='+on+'&msg='+msg)
    }
  },
  dataPage: async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 50;

      let skip = (page - 1) * limit;

      // Check if a search query is present
      let searchQuery = req.query.search || "";
      let regex = new RegExp(searchQuery, "i");

      // Fetch data based on the search query
      const data = await Data.find({
        $or: [
          { Gperu: regex },
          { Grahanathan: regex },
          { Mobile: regex },
          { Panchayath: regex },
          { Written: regex },
        ],
      })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

      const totalCount = await Data.countDocuments();

      res.render("pages/datapage", {
        data,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        searchQuery,
        limit,
      });
    } catch (error) {
        let on = "Data page rendering"
        let msg = error.message
        res.redirect('/error?on='+on+'&msg='+msg)
    }
  },

  settingsPage: async (req, res) => {
    try {
      const aid = req.params.id;
      const adminInfo = await Admin.findById(aid);
      res.render("pages/setting", { adminInfo });
    } catch (error) {
      let on = "Settings page rendering"
      let msg = error.message
      res.redirect('/error?on='+on+'&msg='+msg)
    }
  },

  errorPage: (req, res) => {
    try {
        let on = req.query.on || 'On test error'
        let msg = req.query.msg || 'A test error message'
        res.render('pages/error', {on, msg})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editDataPage: async (req, res) =>{
    try {
      const id = req.query.id
      const data = await Data.findById(id)
      console.log("Editdata: ", data);
      if(!data){
        return
      }
      res.render('pages/editdata', { data })
    } catch (error) {
      let on = "Edit Page Rendering.."
      let msg = error.message
      res.redirect('/error?on='+on+'&msg='+msg)
    }
  },
};
