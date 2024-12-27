const express = require("express");
const cors = require("cors");
const router = require("./router");

require("dotenv/config");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

require("./geminiApi");
app.use("/api", router);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
