import express from "express";
import { createServer as http_createServer } from "http";
import { Server } from "ws";
import { TestRouter } from "./routes";
import { SvgWebSocketServer } from "./sockets";

const app = express();
const server = http_createServer(app);

const webSocketServer = new Server({ server, path: "/ws" });
new SvgWebSocketServer(webSocketServer);

app.use(TestRouter);

const port = 9000;
server.listen(port, () => console.log(`Server is listening on port ${port}`));
