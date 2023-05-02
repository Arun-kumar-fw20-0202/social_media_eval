const express = require("express");
const cors = require("cors");
const { connection } = require("./config");
const userRouter = require("./route/user.router");
const authMiddle = require("./middlewares/auth");
const postRouter = require("./route/post.router");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors);
// app
app.use("/user", userRouter);
app.use(authMiddle);
app.use(postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log("something went wrong");
    console.log(err.message);
  }
  console.log(`server is runnig ${process.env.port}`);
});
