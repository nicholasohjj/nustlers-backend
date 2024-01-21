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

const getTransactionsByUserId = async (req, res) => {
  const { id } = req.params;
  logger.info("Getting transactions by user id:", id);
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`buyer_id.eq.${id},queuer_id.eq.${id}`);

    logger.info("Supabase response:", { data, error }); // Enhanced logging

    if (error) throw error;
    if (data.length === 0) {

      return res.json([]);
    }
    res.json(data);
  } catch (error) {
    logger.error("Error fetching transactions by user id:", error);
    res.status(500).json({ error: error.message });
  }
};

const getTransactionsByStallId = async (req, res) => {
  const { id } = req.params;
  logger.info("Getting transactions by stall id:", id);
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("stall->>stall_id", id); // Querying a nested JSON object

    logger.info("Supabase response:", { data, error }); // Enhanced logging

    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ message: "No transactions found for this stall." });
    }
    res.json(data);
  } catch (error) {
    logger.error("Error fetching transactions by stall id:", error);
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
    const now = new Date();
    const currentDate = new Date(now.getTime() + (8 * 60 * 60 * 1000));
    const gmt8time = currentDate.toISOString()
    value.tm_updated = gmt8time;
    value.tm_created = gmt8time;
    await supabase.from("transactions").insert(value);
    res.json({ message: "Added row!" });
  } catch (error) {
    console.error("Unable to add marker. Error:", JSON.stringify(error, null, 2));
    res.status(500).json(error);
  }
};

const updateTransaction = async (req, res) => {
    const { value, error } = transactionSchema.validate(req.body);
    console.log("value", value)
    if (error) {
      console.error("Invalid transaction:", error);
      return res.status(400).json({ error: "Invalid transaction" });
    }
    console.log("req.params.transaction_id", value.transaction_id)

    const transaction_id = value.transaction_id

    try {
    const now = new Date();
    const currentDate = new Date(now.getTime() + (8 * 60 * 60 * 1000));
    const gmt8time = currentDate.toISOString()
    value.tm_updated = gmt8time;
    const response = await supabase
      .from("transactions")
      .upsert([{ ...value, transaction_id }]);
    res.json(response);
    console.log("Updated row, transaction id: ",transaction_id);
  } catch (error) {
    const message = error.message + "Unable to update row.";
    logger.error("Unable to update row. Error:", JSON.stringify(error, null, 2));
    res.status(400).json({ error: message });
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
  getTransactionsByUserId,
  getTransactionsByStallId,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
