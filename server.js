const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

// ENV
dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer();
// MIDDLEWARE
const app = express();
const io = new Server(server);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
