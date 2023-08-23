const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const authRoutes = require("./routes/Auth/auth.js");
const chatRoutes = require("./routes/Chat/chat.js");
const messageRoutes = require("./routes/Chat/Message.js");

const connectToMongoDb = require("./utils/dbConnection.js");
const Protect = require("./middleware/Protect.js");
const { SocketConnection } = require("./socket.js");

// ENV
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const CLIENT_URL = process.env.CLIENT_URL;

// CONFIGURATION
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

SocketConnection(io);
connectToMongoDb(MONGO_URL);

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// ROUTES
app.use("/api/v1", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
