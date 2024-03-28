const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      lat: {
        type: Number,
        required: true,
        max: 180,
        min: -180,
      },
      lon: {
        type: Number,
        required: true,
        max: 180,
        min: -180,
      },
    },

    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
    },

    category: {
      type: String, // [Desk, MeetingRoom, PrivateOffice, Event and Lifestyle]
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Custom validation to ensure time slot format is correct
          return /^(0[0-9]|1[0-1]):([0-5][0-9])\s(am|pm)\s+to\s+(0[0-9]|1[0-1]):([0-5][0-9])\s(am|pm)$/.test(
            value
          );
        },
        message: (props) => `${props.value} is not a valid time slot format.`,
      },
    },

    features: [
      // { feature: "Ventilated", value: "value1" },
      // { feature: "Sound Proof", value: "value2" },
      // { feature: "Comfortable Seating", value: "value3" },
      // { feature: "Wifi from hosting facility", value: "value4" },
      // { feature: "Electric Connection", value: "value5" },

      {
        feature: String,
        value: String,
      },
    ],

    images: [
      {
        public_id: String,
        url: String,
      },
    ],

    tags: String,

    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    ratingCount: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
