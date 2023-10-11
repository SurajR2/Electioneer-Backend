const nodemailer = require("nodemailer");
const { user, pass } = require("../config");

const sendPasswordResetEmail = async (recipientEmail, resetToken, host) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // See Nodemailer documentation for more information
      service: "Gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    // Create the email content
    const mailOptions = {
      from: "Elecioneer a dapp",
      to: recipientEmail,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested to reset the password for your account.\n\n
        Please click on the following link, or paste it into your browser to reset your password:\n\n
        ${host}/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send password reset email");
  }
};

module.exports = { sendPasswordResetEmail };
