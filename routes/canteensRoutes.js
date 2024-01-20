const express = require("express");
const router = express.Router();
const canteensController = require("../controllers/canteensController");

router.get("/", canteensController.getCanteens);
router.post("/add", canteensController.addCanteen);
router.post("/adds", canteensController.addCanteens);

module.exports = router;
