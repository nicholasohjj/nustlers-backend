const Joi = require("joi");
const supabase = require("../supabase/supabase")
const transactionSchema = require("../schema").transactionSchema;

const getTransactions = async (req, res) => {
  const {data, error} = await supabase.from('transactions').select('*')

  res.json(data)
};

const addTransaction =
    async (transc) => {
  const {value, error} = transactionSchema.validate(transc)
  console.log(value)
  if (error) {
    console.log("Error:", error)
  }

  const {data, errors} = await supabase.from('transactions').insert(value);

  console.log(data);
}

const addTransactions =
    async (req, res) => {
  const trans = req.body;
  const addTransPromises = trans.map(tran => addTransaction(tran));
  Promise.all(addTransPromises);
}

const updateTransactions =
    async (req, res) => {
  // updates new information through transaction id
  const {value} = transactionSchema.validate(req.body);
  const {updatedData, errors} = await supabase.from('transactions').upsert([
    {...value, transaction_id : req.params.transaction_id}
  ]);

  res.json(updatedData);
  return console.log("Updated row, transaction id: ",
                     req.params.transactions_id);
}

const delTransaction =
    async (req, res) => {
  // deletes a transaction post
  const {error} = await supabase.from('transactions')
                      .delete()
                      .eq('transaction_id', req.params.transaction_id);

  if (error) {
    return console.log("Error: ", error);
  }
  return console.log("Deleted row!");
}

                        module.exports = {
  getTransactions,
  addTransaction,
  addTransactions,
  updateTransactions,
  delTransaction
}