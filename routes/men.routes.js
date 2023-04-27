const express = require("express");
const { MenModel } = require("../models/men.model");

const menRouter = express.Router();

menRouter.use(express.json());

menRouter.get("/", async (req, res) => {
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
    const men = await MenModel.find(query)
      .sort({ price: req.query.sort === "lowtohigh" ? 1 : -1 })
      .skip(parseInt(req.query.page) * 12)
      .limit(12);
    res.send(men);

  } catch (error) {
    res.status(500).send(error);
  }
});



menRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const men = await MenModel.findById({ _id: id });
    if (men) {
      res.status(200).json({
        success: true,
        product: men,
      });
    }
  } catch (err) {
    console.log({ err: err });
    res.status(400).send({ success: false, err: err });
  }
});

menRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newMen = new MenModel(payload);
    await newMen.save();
    res
      .status(201)
      .json({ newMen, message: "New Men successfully Added" });
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

menRouter.post("/many", async (req, res) => {
  const payload = req.body;
  try {
    const newMen = await MenModel.insertMany(payload);
    res.status(201).send(newMen);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

menRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const men = await MenModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      success: true,
      msg: "Successfully Updated the men",
      products: men,
    });
    await men.save();
  } catch (err) {
    console.log({ err: err, msg: " men Update Error!" });
    res.send({ success: false, msg: " men Update Error!", err: err });
  }
});

menRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await MenModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The men" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
});


module.exports = {
  menRouter,
};
