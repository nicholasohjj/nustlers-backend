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
  const app = require('./app');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
