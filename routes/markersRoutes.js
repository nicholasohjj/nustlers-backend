const express = require('express');
const router = express.Router();
const markersController = require('../controllers/markersController');

router.get('/', markersController.getMarkers);
router.post('/', markersController.addMarker);
router.delete('/:id', markersController.deleteMarker);

module.exports = router;
    