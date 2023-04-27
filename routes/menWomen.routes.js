const express = require("express");
const { MenWomenModel } = require("../models/menWomen.model");

const menWomenRouter = express.Router();

menWomenRouter.use(express.json());

menWomenRouter.get("/", async (req, res) => {
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
    const prod = await MenWomenModel.find(query)
      .sort({ price: req.query.sort === "lowtohigh" ? 1 : -1 })
      .skip(parseInt(req.query.page) * 12)
      .limit(12);
    res.send(prod);

  } catch (error) {
    res.status(500).send(error);
  }
});



menWomenRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const menWomen = await MenWomenModel.findById({ _id: id });
    if (menWomen) {
      res.status(200).json({
        success: true,
        product: menWomen,
      });
    }
  } catch (err) {
    console.log({ err: err });
    res.status(400).send({ success: false, err: err });
  }
});

menWomenRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newMenWomen = new MenWomenModel(payload);
    await newMenWomen.save();
    res
      .status(201)
      .json({ newMenWomen, message: "New MenWomen successfully Added" });
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

menWomenRouter.post("/many", async (req, res) => {
  const payload = req.body;
  try {
    const newMenWomen = await MenWomenModel.insertMany(payload);
    res.status(201).send(newMenWomen);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

menWomenRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const menWomen = await MenWomenModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      success: true,
      msg: "Successfully Updated the menWomen",
      products: menWomen,
    });
    await menWomen.save();
  } catch (err) {
    console.log({ err: err, msg: " menWomen Update Error!" });
    res.send({ success: false, msg: " menWomen Update Error!", err: err });
  }
});

menWomenRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await MenWomenModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Product" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
});


module.exports = {
  menWomenRouter,
};
