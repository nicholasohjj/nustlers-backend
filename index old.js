const cluster = require("cluster");
const osUtils = require("os-utils");
const numCPUs = require("os").cpus().length; // Number of CPU cores

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

require("dotenv").config();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
  setInterval(() => {
    const totalWorkers = Object.keys(cluster.workers).length;

    osUtils.cpuUsage((cpuPercent) => {
      if (cpuPercent > 0.75 && totalWorkers < numCPUs) {
        cluster.fork(); // Fork a new worker if CPU usage is high and we have room
      }
    });
  }, 5000); // Check every 5 seconds

  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);

    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if (!worker) return;

      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        cluster.fork().on("listening", () => {
          restartWorker(workerIndex + 1);
        });
      });

      worker.disconnect();
    };

    restartWorker(0);
  });
} else {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const docClient = DynamoDBDocumentClient.from(client);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/query", async (req, res) => {
    const command = new ScanCommand({
      TableName: "test",
    });

    try {
      const response = await docClient.send(command);
      console.log("Query succeeded.", response);
      res.json(response);
    } catch (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
  });

  app.get("/query/:id", async (req, res) => {
    const { id } = req.params;

    const command = new GetCommand({
      TableName: "test",
      Key: { id: id },
    });

    try {
      const response = await docClient.send(command);
      console.log("Query succeeded.", response);
      res.json(response);
    } catch (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
  });

  app.get("/query/:name/:age", async (req, res) => {
    const { name, age } = req.params;

    const command = new QueryCommand({
      TableName: "test",
      KeyConditionExpression: "#name = :name and #age = :age",
      ExpressionAttributeNames: {
        "#name": "name",
        "#age": "age",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":age": age,
      },
    });

    try {
      const response = await docClient.send(command);
      console.log("Query succeeded.", response);
      res.json(response);
    } catch (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
  });

  app.post("/add-item", async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const item = {
      TableName: "test",
      Item: {
        id: uuidv4(), // This will generate a unique id
        name: req.body.name,
        age: req.body.age,
      },
    };

    const command = new PutCommand(item);

    try {
      const response = await docClient.send(command);
      console.log("Query succeeded.", response);
      res.json(response);
    } catch (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
  });

  app.put("/update-item", async (req, res) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      age: Joi.number().integer().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id, name, age } = req.body;
    const getItemParams = {
      TableName: "test",
      Key: { id: id },
    };

    try {
      const getResult = await docClient.send(new GetCommand(getItemParams));

      if (!getResult.Item) {
        return res
          .status(404)
          .json({ message: "Item with the provided id does not exist." });
      }

      const updatedParams = {
        TableName: "test",
        Key: {
          id: id,
        },
        UpdateExpression: "set #name = :name, #age = :age",
        ExpressionAttributeNames: {
          "#name": "name",
          "#age": "age",
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":age": age,
        },
        ReturnValues: "UPDATED_NEW", // Returns the attribute values as they appear after the UpdateItem operation
      };

      const command = new UpdateCommand(updatedParams);
      const response = await docClient.send(command);
      console.log("Query succeeded.", response);
      res.json(response);
    } catch (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
  });

  app.delete("/delete-item", async (req, res) => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.body;
    const getItemParams = {
      TableName: "test",
      Key: { id: id },
    };

    try {
      const getResult = await docClient.send(new GetCommand(getItemParams));

      if (!getResult.Item) {
        return res
          .status(404)
          .json({ message: "Item with the provided id does not exist." });
      }

      const deleteParams = {
        TableName: "test",
        Key: {
          id: id,
        },
      };

      const command = new DeleteCommand(deleteParams);
      const response = await docClient.send(command);
      console.log("Query succeeded.", response);
      res.json(response);
    } catch (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
