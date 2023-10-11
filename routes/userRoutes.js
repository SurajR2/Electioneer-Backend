const express = require("express");
const router = express.Router();
// const {
//   signup,
//   login,
//   changePassword,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/authController");
const authController = require("../controllers/authController");
const {
  getAllUserDetails,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { validate } = require("../middlewares/userValidation");
const multerUtil = require("../utils/multerUtil");

// Specify the destination folder for storing the uploaded photos
const upload = multerUtil("./uploads/images");
router.use("/changepassword", authenticate);

router.post("/signup", upload.single("photo"), validate, authController.signup);
// router.post('/signup',upload.single('photo') , signup);
// User details route (protected)

router.post("/changePassword", authenticate, authController.changePassword);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/verifyotp", authController.verifyOTP);

router.post("/login", validate, authController.login);
router.post("/resetpassword", authController.resetPassword);
router.post("/citizens", authController.createCitizen);
router.get("/users", getAllUserDetails);

module.exports = router;
