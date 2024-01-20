const supabase = require("../supabase/supabase");
const transactionSchema = require("../schema").transactionSchema;
const logger = require("../utils/logger");

const getTransactions = async (req, res) => {
  logger.info("Getting transactions");
  try {
    const { data, error } = await supabase.from("transactions").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransaction = async (req, res) => {
    const { value, error } = transactionSchema.validate(req.body);
    if (error) {
      console.log("Invalid transaction:", error);
  
      console.error("Invalid transaction:", error);
      return res.status(400).json({ error: "Invalid transaction" });
    }
    logger.info("Adding transaction");

  try {
    const currentDate = new Date().toISOString(); // ISO 8601 format
    value.tm_created = currentDate;
    value.tm_updated = currentDate;
    await supabase.from("transactions").insert(value);
    res.json({ message: "Added row!" });
  } catch (error) {
    console.error("Unable to add marker. Error:", JSON.stringify(error, null, 2));
    res.status(500).json(error);
  }
};

const updateTransaction = async (req, res) => {
    const { value, error } = transactionSchema.validate(req.body);

    if (error) {
      console.log("Invalid transaction:", error);
  
      console.error("Invalid transaction:", error);
      return res.status(400).json({ error: "Invalid transaction" });
    }
    logger.info("Updating transaction with id:", req.params.transaction_id)

    const transaction_id = req.body.transaction_id


    try {
    const currentDate = new Date().toISOString(); // ISO 8601 format
    value.tm_updated = currentDate;
    const response = await supabase
      .from("transactions")
      .upsert([{ ...value, transaction_id: req.params.transaction_id }]);
    res.json(response);
    console.log("Updated row, transaction id: ", req.params.transaction_id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const {transaction_id} = req.params
  logger.info("Deleting transaction with id:", transaction_id )
  try {
    const response = await supabase
      .from("transactions")
      .delete()
      .eq("transaction_id", transaction_id);

    res.json({ message: "Deleted row!" });
  } catch (error) {
    console.error("Unable to delete row. Error:", JSON.stringify(error, null, 2));
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
