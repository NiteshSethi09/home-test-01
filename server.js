const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/hometest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log("Error occured while connecting to database."));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes/routes"));
app.listen(4000, () => console.log("Server started on port 4000"));
