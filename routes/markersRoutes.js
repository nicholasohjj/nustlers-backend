const express = require('express');
const router = express.Router();
const markersController = require('../controllers/markersController');

router.get('/', markersController.getMarkers);
router.post('/', markersController.addMarker);

module.exports = router;
    