const { verifyOtp } = require("../helpers/verification");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");

// Set up nodemailer transporter (configure email service)
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ccdawebportal@gmail.com",
    pass: "jknseczrkzpyjdia"
  }
});

module.exports = {
  editAdmin: async (req, res) => {
    try {
      const aid = req.params.id;
      await Admin.findByIdAndUpdate(aid, {
        name: req.body.name,
        email: req.body.email,
      }).then(async (data) => {
        let cdata = {
          id: data._id,
          name: data.name,
          email: data.email,
        };
        await res.cookie("admin", cdata, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
      });
      res.redirect("/settings/" + aid);
    } catch (error) {
      let on = "Editing Admin Details";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },

  changePassword: async (req, res) => {
    try {
      const aid = req.cookies.admin.id;
      const admin = await Admin.findById(aid);

      if (admin) {
        if (!isBcryptHash(admin.password)) {
          if (req.body.pass === req.body.cpass) {
            // If password is not bcrypt hashed, compare directly
            if (req.body.current && req.body.current === admin.password) {
              const bpassword = await bcrypt.hash(req.body.pass.trim(), 10);
              await Admin.findByIdAndUpdate(aid, { password: bpassword });
              return res.json({ success: "Password updated successfully" });
            } else {
              return res.json({ error: "Current password is wrong.." });
            }
          } else {
            return res.json({ error: "Passwords not matching.." });
          }
        } else {
          // If password is already bcrypt hashed, use bcrypt.compare
          if (req.body.pass === req.body.cpass) {
            if (await bcrypt.compare(req.body.current, admin.password)) {
              const bpassword = await bcrypt.hash(req.body.pass.trim(), 10);
              await Admin.findByIdAndUpdate(aid, { password: bpassword });
              return res.json({ success: "Password updated successfully" });
            } else {
              return res.json({ error: "Current password is wrong.." });
            }
          } else {
            return res.json({ error: "Passwords not matching.." });
          }
        }
      } else {
        return res.json({ error: "Admin not found" });
      }
    } catch (error) {
      let on = "Editing Password Credentials";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  },

  addAdmin: async (req, res) => {
    try {
      let addby = req.cookies.admin
      if(req.body.pass === req.body.cpass){
        const existance = await Admin.findOne({email: req.body.email})
        if(!existance){
          const bpassword = await bcrypt.hash(req.body.pass.trim(), 10);
          const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: bpassword,
            addby: addby.id,
            addon: Date.now(),
          })
          await newAdmin.save().then((data)=>{
            const verificationUrl = process.env.V_URI + data._id;
            const mailOptions = {
              from: "ccdawebportal@gmail.com",
              to: data.email,
              subject: "Admin of CCDA added you as new administrator, You added by: "+addby.name,
              text: `Click on the link verify email: ${verificationUrl}, Your current password is:"${req.body.pass}" Don't forget to change it after login for making you secure..`
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Error sending email: " + error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            return res.json({success: "Successfully added, Verification Email Send to "+data.email})
          })
        }else{
          return res.json({error:"This email is already taken by "+existance.name})
        }
      }else{
        return res.json({error:"The passwords for new Admin is confusing.."})
      }
    } catch (error) {
      let on = "Adding a new administrator";
      let msg = error.message;
      res.redirect("/error?on=" + on + "&msg=" + msg);
    }
  }
};

function isBcryptHash(input) {
  const bcryptRegex = /^\$2[aby]\$\d+\$[./A-Za-z0-9]{53}$/;
  return bcryptRegex.test(input);
}
