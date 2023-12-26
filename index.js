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

require("dotenv").config();
  const app = require('./app');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
