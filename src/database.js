const mongoose = require("mongoose");
require("dotenv").config();

const URI = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.t5uoa.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("DB is connected");
  })
  .catch((e) => {
    console.log("Database error", e);
  });
