const Admin = require("../models/adminModel");

module.exports = {
    verifyOtp: async (userid, code) => {
        return new Promise(async (resolve, reject)=>{
            const admin = await Admin.findById(userid)
            if(admin.vcode == code){
                await Admin.findByIdAndUpdate(admin._id, {verify: true})
                resolve()
            }
        })
    }
}