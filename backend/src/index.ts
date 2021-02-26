import express from "express";
import * as bodyParser from "body-parser";
import { createServer as http_createServer } from "http";
import { Server } from "ws";
import { ChatRouter, UserRouter } from "./routes";
import { ChatWebSocketServer } from "./sockets";
import { initializeDatabase } from "./database";
import { User } from "./models/database";
import { JSEASSIONID } from "./controller";
import cookieParser from "cookie-parser";

// Initialize Express and extract Server
const app = express();
const server = http_createServer(app);

// Initialize Database
initializeDatabase().then(() => {
  // Initialize WebSocket Server
  const webSocketServer = new Server({ server, path: "/ws" });
  new ChatWebSocketServer(webSocketServer);

  // Setup Express
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    console.log(
      `${new Date(Date.now()).toISOString()}: ${req.method} ${req.url}`
    );

    next();
  });

  // Add Middleware
  app.use(async (req, res, next) => {
    const userId = req.cookies?.[JSEASSIONID];

    if (userId) {
      console.log(`UserID: ${userId}`);

      req.user = await User.findByPk(userId);
    }
    next();
  });

  // Check for every Route except /users/login, if the user is logged in
  app.use(/^(?!\/users\/login).*$/, function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).send("Not logged in!");
    }
  });

  app.use((req, res, next) => {
    console.log(req.body);

    next();
  });

  // Add Routes
  app.use("/users", UserRouter);
  app.use("/chats", ChatRouter);

  // Send Status 404, if Route is not defined
  app.use("*", (req, res) => {
    res.status(404).send(`Route ${req.url} is not defined`);
  });

  // Start Server
  const port = process.env.PORT || 9000;
  server.listen(port, () => console.log(`Server is listening on port ${port}`));
});
