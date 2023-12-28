const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const markersController = require('../controllers/markersController');

router.get('/', markersController.getMarkers);
router.post('/', transactionsController.addTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
    