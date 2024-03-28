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
  cancelBooking,
  updateBookingById,
  updateBookingStatusAutomatically,
  updateBookingStatusByAdmin,
  setCurrentLocation,
  sendNotification,
  rateBooking,
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
router.get("/all-users", getallUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/current-location", setCurrentLocation);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
// router.post("/apply-coupon", authMiddleware, applyCoupon);

router.post("/create-booking/:podId", authMiddleware, createBooking);
router.get("/all-bookings-by-user", authMiddleware, getBookingsByUser); // not working
router.get("/all-bookings", authMiddleware, isAdmin, getBookings); // not working

router.get("/booking/:id", authMiddleware, getBookingById);
router.put("/update-booking/:id", authMiddleware, updateBookingById);
router.put("/cancle-booking/:id", authMiddleware, cancelBooking);

router.put(
  "/auto-update-booking-status",
  authMiddleware,
  updateBookingStatusAutomatically
);

router.put(
  "/booking-status/:id",
  authMiddleware,
  isAdmin,
  updateBookingStatusByAdmin
);

router.post("/rate-booking/:id", authMiddleware, rateBooking);

router.put("/notification", authMiddleware, sendNotification);

module.exports = router;
