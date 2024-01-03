const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const DataSchema = new Schema({
  Formnumber: { type: Number, default: 0 },
  Panchayath: { type: String },
  Ward: { type: String },
  Sthalam: { type: String },
  Grahanathan: { type: String },
  Gperu: { type: String },
  Veetuperu: { type: String },
  Jalam: { type: String },
  Thamasam: { type: String },
  Veedinteswapavam: { type: String },
  Vishadavivaram1: { type: String },
  Rationcard: { type: String },
  Landmark: { type: String },
  Vahanam: { type: String },
  Panchayath2: { type: String },
  Vishadavivaram2: { type: String },
  Mobile: { type: String },
  Address: { type: String },
  Wardhome: { type: String,  },
  Whatsapp: { type: String },
  Extra2: { type: String },
  Binnasheshi: { type: String },
  Boorahithan: { type: String },
  Tabledata: [{
     Anathar: { type: String },
     Avastha: { type: String },
     Bandham: { type: String },
     Dob: { type: Date },
     Education: { type: String },
     Insurance: { type: String },
     Joli: { type: String },
     Jolisthalam: { type: String },
     Mekala: { type: String },
     Linkam: { type: String },
     Peru: { type: String },
     Phone: { type: String },
     Rakshithav: { type: String },
     Raktham: { type: String },
     Standard: { type: String },
     Vivaham: { type: String },
  }],
  Email: { type: String },
  Area: { type: String },
  Pithav: { type: String },
  Extra1: { type: String },
  Addon: { type: Date },
  Written: { type: String },
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;

