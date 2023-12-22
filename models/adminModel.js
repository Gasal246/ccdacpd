const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const AdminSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  addon:{
    type: Date,
  },
  addby:{
    type: Schema.Types.ObjectId,
  },
  vcode:{
    type: String,
  },
  verify:{
    type: Boolean,
    default: false
  }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;

