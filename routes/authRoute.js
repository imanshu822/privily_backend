const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  saveAddress,
  // applyCoupon,
  createBooking,
  getBookings,
  getBookingsByUser,
  getBookingById,
  updateBookingStatus,
  setCurrentLocation,
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/logout", logout);
router.post("/admin-login", loginAdmin);

router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.get("/refresh", handleRefreshToken);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// router.post("/apply-coupon", authMiddleware, applyCoupon);
router.post("/create-booking", authMiddleware, createBooking);
router.get("/bookings", authMiddleware, getBookings);
router.get("/bookings-by-user", authMiddleware, getBookingsByUser);
router.get("/booking/:id", authMiddleware, getBookingById);
router.put("/booking-status/:id", authMiddleware, isAdmin, updateBookingStatus);
router.put("/current-location", setCurrentLocation);

module.exports = router;
