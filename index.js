const express = require("express");
const userRouter = require("./routes/userRoute");
const doctorRouter = require("./routes/doctorRoute");
const connection = require("./db");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`connetcted to DB at port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
