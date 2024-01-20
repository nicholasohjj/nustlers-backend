const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.get("/stall", itemsController.getItemsById);

module.exports = router;
