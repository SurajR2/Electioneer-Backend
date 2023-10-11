const mongoose = require("mongoose");
const fs = require("fs");

const citizenSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  citizenshipNo: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
    required: true,
  },
  lifestatus: {
    type: Boolean,
    required: true,
  },
});

const Citizen = mongoose.model("Citizen", citizenSchema);



module.exports = Citizen;
