const express = require('express');
const router = express.Router();
const markersController = require('../controllers/markersController');

router.get('/', markersController.getMarkers);
router.post('/add', markersController.addMarker);
router.post('/adds', markersController.addMarkers);

module.exports = router;