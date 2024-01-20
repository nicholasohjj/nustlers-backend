const express = require("express");
const router = express.Router();
const canteensController = require("../controllers/canteensController");

router.get("/", canteensController.getCanteens);
router.get("/:id", canteensController.getCanteenById);

module.exports = router;
