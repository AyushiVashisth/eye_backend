const express= require("express")
const {connection}= require("./configs/db")
const { productRouter } = require("./routes/product.routes")
const {userRouter}=require('./routes/user.routes')
const { cartRouter } = require("./routes/cart.routes");
const cors = require("cors");
const { kidstRouter } = require("./routes/kids.routes");
const { menWomenRouter } = require("./routes/menWomen.routes");
const { menRouter } = require("./routes/men.routes");
const { womenRouter } = require("./routes/women.routes");
const app= express()
require("dotenv").config();
app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.use("/cart", cartRouter);
app.use("/kids",kidstRouter);
app.use("/menWomen",menWomenRouter);
app.use("/men",menRouter);
app.use("/product", productRouter);
app.use('/users',userRouter);
app.use("/women",womenRouter);


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connect to db")
    } catch (error) {
        console.log("can't connected")
        console.log(error);
    }
    console.log(`Server is running port ${process.env.port}`)
    
})
