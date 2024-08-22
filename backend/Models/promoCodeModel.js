const mongoose = require("mongoose");

const promoCodeSchema = mongoose.Schema(
  {
    promoCode: {
      type: String,
      unique: true,
      default: "NO CODE USER",
    },
  },
  {
    timestamps: true,
  }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
module.exports = PromoCode;
