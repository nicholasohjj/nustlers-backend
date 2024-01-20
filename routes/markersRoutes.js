const express = require('express');
const router = express.Router();
const markersController = require('../controllers/markersController');

router.get('/', markersController.getMarkers);
router.get('/info', markersController.getInfo);

module.exports = router;