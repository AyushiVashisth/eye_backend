const express = require("express");
const { KidsModel } = require("../models/kids.model");

const kidstRouter = express.Router();

kidstRouter.use(express.json());

kidstRouter.get("/", async (req, res) => {
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
    const kids = await KidsModel.find(query)
      .sort({ price: req.query.sort === "lowtohigh" ? 1 : -1 })
      .skip(parseInt(req.query.page) * 12)
      .limit(12);
    res.send(kids);

  } catch (error) {
    res.status(500).send(error);
  }
});



kidstRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const kids = await KidsModel.findById({ _id: id });
    if (kids) {
      res.status(200).json({
        success: true,
        product: kids,
      });
    }
  } catch (err) {
    console.log({ err: err });
    res.status(400).send({ success: false, err: err });
  }
});

kidstRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newKids = new KidsModel(payload);
    await newKids.save();
    res
      .status(201)
      .json({ newKids, message: "New Kids successfully Added" });
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

kidstRouter.post("/many", async (req, res) => {
  const payload = req.body;
  try {
    const newKids = await KidsModel.insertMany(payload);
    res.status(201).send(newKids);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

kidstRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const kids = await KidsModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      success: true,
      msg: "Successfully Updated the kids",
      products: kids,
    });
    await kids.save();
  } catch (err) {
    console.log({ err: err, msg: " kids Update Error!" });
    res.send({ success: false, msg: " kids Update Error!", err: err });
  }
});

kidstRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await KidsModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The kids" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
});


module.exports = {
  kidstRouter,
};
