const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.post("/add", itemsController.addItem);
router.post("/adds", itemsController.addItems);

module.exports = router;
