const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth.js");
const chatRoutes = require("./routes/chat.js");
const messageRoutes = require("./routes/Message.js");
const updateRoutes = require("./routes/update.js");

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WhatsApp Clone API",
      version: "1.0.0",
      description: "My API documentation @Rooney",
      
    },
  },
  apis: [
    "./routes/auth.js",
    "./routes/chat.js",
    "./routes/Message.js",
    "./routes/update.js",
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

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

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api/v1", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/update", updateRoutes);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
