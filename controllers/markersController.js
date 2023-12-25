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
  
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const docClient = DynamoDBDocumentClient.from(client);

const markerSchema = Joi.object({
    coordinate: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    }).required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required()
  });

const getMarkers = async (req, res) => {
  const command = new ScanCommand({
    TableName: "markers",
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

const addMarker = async (req, res) => {
    const { error, value } = markerSchema.validate(req.body);
    if (error) {
      console.error("Invalid marker:", error);
      return res.status(400).json({ error: "Invalid marker" });
    }

    const { coordinate, title, description, image } = value;
    const id = uuidv4();

    const command = new PutCommand({
      TableName: "markers",
      Item: {
        id,
        coordinate,
        title,
        description,
        image,
      },
    });

    try {
      const response = await docClient.send(command);
      console.log("Add marker succeeded.", response);
      res.json({ id });
    } catch (err) {
      console.error("Unable to add marker. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
}

module.exports = {
  getMarkers,
  addMarker
};
