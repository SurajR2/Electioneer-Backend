const User = require("../models/User");
const express = require("express");
const router = express.Router();
const fs = require("fs");

// Get user details
const getUserDetailsbyuid = async (req, res) => {
  try {
    const { userId } = req.user;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user details error:", error);
    res.status(500).json({ error: "Failed to get user details" });
  }
};

module.exports = {
  getUserDetailsbyuid,
};

// Get all user details
const getAllUserDetails = async (req, res) => {
  try {
    // Find all users
    const users = await User.find(
      {},
      "firstName lastName photo citizenshipNo userAddress"
    );
    console.log(users)

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    let photoContent
    users.forEach((user) => {
      const photoPath = `uploads/images/${user.photo}`;
       photoContent = fs.readFileSync(photoPath, { encoding: "base64" });
      user.photo = photoContent;
    });

    res.status(200).send({users});
  } catch (error) {
    console.error("Get all user details error:", error);
    res.status(500).json({ error: "Failed to get user details" });
  }
};

// const getAllUserDetails = async (req, res) => {
//   try {
//     // Find all users
//     const users = await User.find(
//       {},
//       "firstName lastName photo citizenshipNo userAdderss"
//     );

//     if (users.length === 0) {
//       return res.status(404).json({ error: "No users found" });
//     }

//     // Get the photo file for the current user
//     const photoPath =`uploads/images/${users[0].photo}`;

//     // Create a file stream for the photo file
//     const fileStream = fs.createReadStream(photoPath);
//     console.log(photoPath)

//     // Set the Content-Type header to the correct MIME type
//     res.setHeader("Content-Type", fileStream.mime);

//     // Check if the photo is uploaded
//     if (!photoPath) {
//       // The photo is not uploaded, so send a 404 error
//       return res.status(404).json({ error: "Photo not uploaded" });
//     }

//     // Send the photo file as a response
//     res.sendFile(fileStream);
//   } catch (error) {
//     console.error("Get all user details error:", error);
//     res.status(500).json({ error: "Failed to get user details" });
//   }
// };
module.exports = {
  getAllUserDetails,
};
