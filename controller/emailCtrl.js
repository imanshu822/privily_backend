const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const sendEmail = asyncHandler(async () => {
  const email = "anshu@mobyink.com";
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found with this email");
  }
  const token = await user.createPasswordResetToken();
  await user.save();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });
  const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
  const mailOptions = {
    from: '"Hey 👻" <imanshu822@gmail.com>',
    to: user.email,
    subject: "Forgot Password Link",
    html: resetURL,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
});

module.exports = { sendEmail };
