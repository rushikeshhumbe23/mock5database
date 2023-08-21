const mongoose = require("mongoose");

const typeString = { type: String, required: true };
const typeNum = { type: Number, required: true };
const doctorSchema = mongoose.Schema(
  {
    name: typeString,
    image: typeString,
    specialization: typeString,
    experience: typeNum,
    location: typeString,
    date: typeString,
    slots: typeNum,
    fee: typeNum,
  },
  { versionKey: false }
);

const doctorModel = mongoose.model("doctor", doctorSchema);

module.exports = doctorModel;
