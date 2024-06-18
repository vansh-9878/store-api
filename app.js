require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const productRouter = require("./routes/products");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products...</a>");
});
app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.mongo);
    app.listen(8080, () => {
      console.log(`Server Live on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
