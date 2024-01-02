const Data = require("../models/dataModel");

module.exports = {
  saveData: async (req, res) => {
    try {
      console.log(req.body);
      const tableData = [];
      let i = 0;
      while (req.body[`tableData[${i}].peru`]) {
        tableData.push({
            Anathar: req.body[`tableData[${i}].anathar`] || '',
            Avastha: req.body[`tableData[${i}].avastha`] || '',
            Bandham: req.body[`tableData[${i}].bandham`] || '',
            Dob: req.body[`tableData[${i}].dob`] || '',
            Education: req.body[`tableData[${i}].education`] || '',
            Insurance: req.body[`tableData[${i}].insurance`] || '',
            Joli: req.body[`tableData[${i}].joli`] || '',
            Jolisthalam: req.body[`tableData[${i}].jolisthalam`] || '',
            Linkam: req.body[`tableData[${i}].linkam`] || '',
            Peru: req.body[`tableData[${i}].peru`] || '',
            Phone: req.body[`tableData[${i}].phone`] || '',
            Rakshithav: req.body[`tableData[${i}].rakshithav`] || '',
            Raktham: req.body[`tableData[${i}].raktham`] || '',
            Standard: req.body[`tableData[${i}].standard`] || '',
            Vivaham: req.body[`tableData[${i}].vivaham`] || '',
        });
        i++;
      }
      console.log("Tabledata: ", tableData);
      // const lastForm = await Data.find({}, {Formnumber: 1}).sort({ Formnumber: -1 }).limit(1)
      // let FormNumber = lastForm.length > 0 ? lastForm[0].Formnumber+1 : 1
      // console.log(lastForm[0]);
      let admin = req.cookies.admin.name
      const newData = new Data({
        Formnumber: parseInt(req.body.formno),
        Panchayath: req.body.panchayath,
        Ward: req.body.ward,
        Sthalam: req.body.sthalam,
        Grahanathan: req.body.grahanathan,
        Gperu: req.body.gperu,
        Veetuperu: req.body.veetuper,
        Jalam: req.body.jalam == 'true' ? "ഉണ്ട്" : "ഇല്ല",
        Pithav: req.body.pithav,
        Area: req.body.area,
        Thamasam: req.body.thamasam,
        Veedinteswapavam: req.body.veedinteswapavam,
        Rationcard: req.body.rationcard,
        Vahanam: req.body.vahanam,
        Vishadavivaram1: req.body.vishadavivaram1,
        Vishadavivaram2: req.body.vishadavivaram2,
        Landmark: req.body.landmark,
        Address: req.body.address,
        Panchayath2: req.body.panchayath2,
        Wardhome: req.body.wardhome,
        Mobile: req.body.mobile,
        Whatsapp: req.body.whatsapp,
        Email: req.body.email,
        Extra1: req.body.extra1,
        Extra2: req.body.extra2,
        Binnasheshi: req.body.binnasheshi == 'true' ? "ഉണ്ട്" : "ഇല്ല",
        Boorahithan: req.body.boorahithan == 'true' ? "അതെ" : "അല്ലാ",
        Tabledata: tableData,
        Addon: Date.now(),
        Written: admin,
      });
      await newData.save();
      req.json({ success: true });
    } catch (error) {
      let on = "Saving Data";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },
  deleteData: async (req, res) => {
    try {
      let dataid = req.query.id
      const data = await Data.findByIdAndDelete(dataid)
      if(!data){
        return res.json({error: "Cannot find data for "+dataid})
      }
      return res.json({success:"Successfully Deleted Form "+data.Formnumber})
    } catch (error) {
      let on = "Deletion of data from table";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },
  editedData: async (req, res) =>{
    try {
      const did = req.params.id
      const tableData = [];
      let i = 0;
      while (req.body[`tableData[${i}].peru`]) {
        tableData.push({
            Anathar: req.body[`tableData[${i}].anathar`] || '',
            Avastha: req.body[`tableData[${i}].avastha`] || '',
            Bandham: req.body[`tableData[${i}].bandham`] || '',
            Dob: req.body[`tableData[${i}].dob`] || '',
            Education: req.body[`tableData[${i}].education`] || '',
            Insurance: req.body[`tableData[${i}].insurance`] || '',
            Joli: req.body[`tableData[${i}].joli`] || '',
            Jolisthalam: req.body[`tableData[${i}].jolisthalam`] || '',
            Linkam: req.body[`tableData[${i}].linkam`] || '',
            Peru: req.body[`tableData[${i}].peru`] || '',
            Phone: req.body[`tableData[${i}].phone`] || '',
            Rakshithav: req.body[`tableData[${i}].rakshithav`] || '',
            Raktham: req.body[`tableData[${i}].raktham`] || '',
            Standard: req.body[`tableData[${i}].standard`] || '',
            Vivaham: req.body[`tableData[${i}].vivaham`] || '',
        });
        i++;
      }
      console.log("Tabledata: ", tableData);
      let admin = req.cookies.admin.name
      const newData = {
        Formnumber: parseInt(req.body.formno),
        Panchayath: req.body.panchayath,
        Ward: req.body.ward,
        Sthalam: req.body.sthalam,
        Grahanathan: req.body.grahanathan,
        Gperu: req.body.gperu,
        Veetuperu: req.body.veetuper,
        Jalam: req.body.jalam == 'true' ? "ഉണ്ട്" : "ഇല്ല",
        Pithav: req.body.pithav,
        Area: req.body.area,
        Thamasam: req.body.thamasam,
        Veedinteswapavam: req.body.veedinteswapavam,
        Rationcard: req.body.rationcard,
        Vahanam: req.body.vahanam,
        Vishadavivaram1: req.body.vishadavivaram1,
        Vishadavivaram2: req.body.vishadavivaram2,
        Landmark: req.body.landmark,
        Address: req.body.address,
        Panchayath2: req.body.panchayath2,
        Wardhome: req.body.wardhome,
        Mobile: req.body.mobile,
        Whatsapp: req.body.whatsapp,
        Email: req.body.email,
        Extra1: req.body.extra1,
        Extra2: req.body.extra2,
        Binnasheshi: req.body.binnasheshi == 'true' ? "ഉണ്ട്" : "ഇല്ല",
        Boorahithan: req.body.boorahithan == 'true' ? "അതെ" : "അല്ലാ",
        Tabledata: tableData,
        Addon: Date.now(),
        Written: admin,
      };
      await Data.findByIdAndUpdate(did, newData)
      res.json({success: "Form Successfully updated.."})
    } catch (error) {
      let on = "Edit Page Rendering.."
      let msg = error.message
      res.redirect('/error?on='+on+'&msg='+msg)
    }
  },
  generatePdf: (req, res) => {
    try {
      
    } catch (error) {
      let on = "Generate PDF Function";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  }
};
