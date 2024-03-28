const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    podId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    bookingPurpose: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      require: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    timeSlotNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Processing",
        "Completed",
        "Rated",
      ],
      default: "Pending",
    },
    isBookingActive: {
      type: Boolean,
      default: true,
    },

    // totalCost: {
    //   type: Number,
    //   required: true,
    // },
    // totalAfterDiscountCost: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);
// bookingSchema.index({ date: 1 }, { unique: true }); // Ensure unique bookings per date (optional)
module.exports = mongoose.model("Booking", bookingSchema);
