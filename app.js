const express = require("express");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const markersRoutes = require("./routes/markersRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const stallsRoutes = require("./routes/stallsRoutes");
const canteensRoutes = require("./routes/canteensRoutes");

app.use(cors());
app.use(express.json());
app.use(
    rateLimit({
      windowMs : 15 * 60 * 1000, // 15 minutes
      max : 100,                 // limit each IP to 100 requests per windowMs
    }),
);
// Use routes
app.get("/", (req, res) => { res.json("Hello World!"); });

app.use("/markers", markersRoutes);
app.use("/items", itemsRoutes);
app.use("/transactions", transactionRoutes);
app.use("/stalls", stallsRoutes);
app.use("/canteens", canteensRoutes);

module.exports = app;
