const mongoose = require("mongoose");



const date = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}); // Create a Date object with the current date and time
const time = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const dateTimeString = `${date} ${time}`;

const withdrawalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    created: {
      type: String,
      default: dateTimeString,
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
      default: 0.0,
    },
    wallet: {
      type: String,
      required: [true, "Please add an valid wallet"],
      trim: true,
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Withdraw = mongoose.model("Withdraw", withdrawalSchema);
module.exports = Withdraw;
