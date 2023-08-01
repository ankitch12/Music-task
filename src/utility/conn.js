const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://funtogetherhope:togetherHope@cluster0.tlbh4qf.mongodb.net/funTogether"
  )
  .then(() => {
    console.log("Connection is set.");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });
