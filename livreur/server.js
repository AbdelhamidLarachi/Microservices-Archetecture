const app = require("./src/app");
const mongoose = require("mongoose");
const cors = require('cors')
const express = require("express");

mongoose.connect(process.env.MONGO_DB_URI);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
