const mongoose = require("mongoose");

const verificationOTPSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    // required: true,
    default: null,
  },
  otpExpiry: {
    type: Date,
    // required: true,
    default: null,
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiry: {
    type: Date,
    default: null,
  },
  
});

const VerificationOTP = mongoose.model(
  "VerificationOTP",
  verificationOTPSchema
);

module.exports = VerificationOTP;
