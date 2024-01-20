const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

router.get('/', transactionsController.getTransactions)
router.post('/add', transactionsController.addTransaction)
router.post('/adds', transactionsController.addTransactions)

module.exports = router;