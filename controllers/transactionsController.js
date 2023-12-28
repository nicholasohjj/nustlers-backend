const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const transactionSchema = require("../schemas").transactionSchema;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = DynamoDBDocumentClient.from(client);

const getAllTransactions = async (req, res) => {
  const command = new ScanCommand({
    TableName: "transactions",
  });

  try {
    const response = await docClient.send(command);
    console.log("Query succeeded.", response);
    res.json(response.Items);
  } catch (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    res.status(500).json(err);
  }
};

const addTransaction = async (req, res) => {
  const { error, value } = transactionSchema.validate(req.body);
  if (error) {
    console.log("Invalid transaction:", error);
    console.error("Invalid transaction:", error);
    return res.status(400).json({ error: "Invalid transaction" });
  }

  const {
    location_id,
    stall_id,
    items,
    queuer_id,
    queuer_mobile,
    buyer_id,
    buyer_mobile,
    status,
    fee,
    total_cost,
    pick_up_point,
  } = value;
  const transaction_id = uuidv4();

  const command = new PutCommand({
    TableName: "transactions",
    Item: {
      transaction_id,
      location_id,
      stall_id,
      items,
      queuer_id,
      queuer_mobile,
      buyer_id,
      buyer_mobile,
      status,
      fee,
      total_cost,
      pick_up_point,
    },
  });

  //status includes: "pending", "paid", "collected", "delivered"

  try {
    const response = await docClient.send(command);
    console.log("Add transaction succeeded.", response);
    res.json({ transaction_id });
  } catch (err) {
    console.error("Unable to add transaction. Error:", JSON.stringify(err, null, 2));
    res.status(500).json(err);
  }
};

const deleteTransaction = async (req, res) => {
  const { transaction_id } = req.params;
  console.log("Deleting transaction with id:", transaction_id);
  const command = new DeleteCommand({
    TableName: "transactions",
    Key: {
      transaction_id,
    },
  });

  try {
    const response = await docClient.send(command);
    console.log("Delete transaction succeeded.", response);
    res.json({ transaction_id });
  } catch (err) {
    console.error("Unable to delete transaction. Error:", JSON.stringify(err, null, 2));
    res.status(500).json(err);
  }
}

module.exports = {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
};
