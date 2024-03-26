const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    podId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    startTime: {
      type: String,
      required: true,
      unique: true,
    },
    endTime: {
      type: String,
      required: true,
      unique: true,
    },
    timeSlotNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed", "Reted"],
      default: "Pending",
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

module.exports = mongoose.model("Booking", bookingSchema);
