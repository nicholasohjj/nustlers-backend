const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

router.get('/', transactionsController.getTransactions)
router.get('/:id', transactionsController.getTransactionsByUserId)
router.get('/stall/:id', transactionsController.getTransactionsByStallId)
router.post('/', transactionsController.addTransaction)
router.put("/", transactionsController.updateTransaction)
router.delete("/:transaction_id", transactionsController.deleteTransaction)


module.exports = router;