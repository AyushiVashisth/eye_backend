const mongoose = require("mongoose");

const kidsSchema = mongoose.Schema({
  imageTsrc: String,
  productRefLink: String,
  rating: Number,
  colors: String,
  price: Number,
  mPrice: Number,
  name: String,
  shape: String,
  gender: String,
  style: String,
  dimension: String,
  productType: String,
  productId: String,
  userRated: Number,
  quantity: Number,
  id: Number,
});

const KidsModel = mongoose.model("kids", kidsSchema);

module.exports = {
  KidsModel,
};
