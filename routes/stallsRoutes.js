const express = require("express");
const router = express.Router();
const stallsController = require("../controllers/stallsController");

router.get("/", stallsController.getStalls);
router.get("/canteen", stallsController.getStallsById);

module.exports = router;