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
      console.log("Invalid transaction:", error);
  
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
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
