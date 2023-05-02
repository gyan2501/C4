const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { postRouter } = require("./routes/Post.routes");
const { auth } = require("./middleware/Auth.middleware");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors);

app.use("/users", userRouter);

app.use(auth);


// POST ROutes
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Not able to connect DB!");
  }
  console.log(`Server is running on port ${process.env.port}`);
});
