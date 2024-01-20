const express = require("express");
const router = express.Router();
const stallsController = require("../controllers/stallsController");

router.get("/", stallsController.getStalls);
router.post("/add", stallsController.addStall);
router.post("/adds", stallsController.addStalls);

module.exports = router;
