const Joi = require("joi");
const supabase = require("../supabase/supabase")
const transactionSchema = require("../schema").transactionSchema;

const getTransactions = async (req, res) => {
    const {data, error} =  await supabase  
        .from('transactions')
        .select('*')

    res.json(data)
};

const addTransaction = async (transc) => {

    const {value, error} = transactionSchema.validate(transc)
    console.log(value)
    if (error){
        console.log("Error:", error)
    }

    const { data, errors } = await supabase
        .from('transactions')
        .insert(value);

    console.log(data);
}

const addTransactions = async (req, res) => {
    const trans = req.body;
    const addTransPromises = trans.map(tran => addTransaction(tran));
    Promise.all(addTransPromises);

}

module.exports = {
    getTransactions,
    addTransaction,
    addTransactions
}