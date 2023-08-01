const express = require("express");
var cors = require("cors");
require("./src/utility/conn");

const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const port = 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/music", require("./src/routes/musicRoute"));

app.use(errors());

app.get("/status", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Api Not Found",
  });
});
app.listen(port, () => {
  console.log("app listening on port:", port);
});
