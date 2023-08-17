const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const authRoutes = require("./routes/Auth/auth.js");
const connectToMongoDb = require("./utils/dbConnection.js");
const Protect = require("./middleware/Protect.js");

// ENV
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// CONFIGURATION
const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectToMongoDb(MONGO_URL);

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// ROUTES
app.use("/api/auth", authRoutes);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
