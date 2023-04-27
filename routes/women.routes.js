const express = require("express");
const { WomenModel } = require("../models/women.model");

const womenRouter = express.Router();

womenRouter.use(express.json());

womenRouter.get("/", async (req, res) => {
  const query = {};
  if (req.query.rating) {
    query.rating = req.query.rating;
  }
  if (req.query.colors) {
    query.colors = { $regex: req.query.colors };
  }
  if (req.query.price) {
    query.price = req.query.price;
  }
  if (req.query.mPrice) {
    query.mPrice = req.query.mPrice;
  }
  if (req.query.shape) {
    query.shape = req.query.shape;
  }
  if (req.query.gender) {
    query.gender = { $regex: req.query.gender };
  }
  if (req.query.style) {
    query.style = req.query.style;
  }
  if (req.query.dimension) {
    query.dimension = req.query.dimension;
  }
  if (req.query.productType) {
    query.productType = req.query.productType;
  }
  if (req.query.userRated) {
    query.userRated = req.query.userRated;
  }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }
  if (req.query.productRefLink) {
    query.productRefLink = { $regex: req.query.productRefLink, $options: "i" };
  }

  try {
    const women = await WomenModel.find(query)
      .sort({ price: req.query.sort === "lowtohigh" ? 1 : -1 })
      .skip(parseInt(req.query.page) * 12)
      .limit(12);
      // console.log(prod)
    res.send(women);

  } catch (error) {
    res.status(500).send(error);
  }
});



womenRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const women = await WomenModel.findById({ _id: id });
    if (women) {
      res.status(200).json({
        success: true,
        product: women,
      });
    }
  } catch (err) {
    console.log({ err: err });
    res.status(400).send({ success: false, err: err });
  }
});

womenRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newWomen = new WomenModel(payload);
    await newWomen.save();
    res
      .status(201)
      .json({ newWomen, message: "New Women successfully Added" });
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

womenRouter.post("/many", async (req, res) => {
  const payload = req.body;
  try {
    const newWomen = await WomenModel.insertMany(payload);
    res.status(201).send(newWomen);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

womenRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const women = await WomenModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      success: true,
      msg: "Successfully Updated the women",
      products: women,
    });
    await women.save();
  } catch (err) {
    console.log({ err: err, msg: " women Update Error!" });
    res.send({ success: false, msg: " women Update Error!", err: err });
  }
});

womenRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await WomenModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Product" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
});


module.exports = {
  womenRouter,
};
