import { IncomingHttpHeaders, IncomingMessage } from "http";
import { JSEASSIONID } from "../controller/UserController";
import ws_WebSocket from "ws";
import { CLOSED, CLOSING } from "ws";

export abstract class MessageServer<T> {
  protected clientsByUserId: { userId: number; clients: ws_WebSocket[] }[] = [];

  constructor(private readonly wsServer: ws_WebSocket.Server) {
    this.wsServer.on("connection", this.subscribeToMessages);
    this.wsServer.on("error", this.cleanupDeadClients);
  }

  protected abstract handleMessage(sender: ws_WebSocket, message: T): void;

  protected abstract onStartConnection(socket: ws_WebSocket): void;

  protected readonly subscribeToMessages = (
    ws: ws_WebSocket,
    request: IncomingMessage
  ): void => {
    console.log("New Client Connected");

    // console.log(`Websocket HTTP Request: ${JSON.stringify(request)}`);
    console.log(`Websocket Cookies: ${request.headers.cookie}`);

    const httpCookies = this.extractCookies(request.headers);

    const userId = Number(httpCookies?.[JSEASSIONID]);

    console.log(`UserId: `, userId);

    if (userId) {
      const clientObject = this.clientsByUserId.find(
        (val) => val.userId === userId
      );
      if (clientObject) {
        clientObject.clients.push(ws);
      } else {
        this.clientsByUserId.push({ userId, clients: [ws] });
      }

      ws.on("message", (data: ws_WebSocket.Data) => {
        if (typeof data === "string") {
          this.handleMessage(ws, JSON.parse(data));
        } else {
          console.log("Received data of unsupported type.");
        }
      });

      this.onStartConnection(ws);
    } else {
      console.log("Closing Websocket Vonnection from newly connected Socket");

      ws.close(4001, "User is not Logged in");
    }
  };

  extractCookies(
    httpRequestHeaders: IncomingHttpHeaders
  ): { [key: string]: string } {
    const cookiesStr = httpRequestHeaders.cookie?.split("; ");
    if (!cookiesStr) {
      return {};
    }

    const cookies: { [key: string]: string } = {};

    cookiesStr.forEach((str) => {
      const parts = str.split("=");

      cookies[parts[0]] = parts[1];
    });

    return cookies;
  }

  private readonly cleanupDeadClients = (): void => {
    this.clientsByUserId.forEach((user) => {
      user.clients.filter((client) => this.isAlive(client));
    });
  };

  protected broadcastExcept(
    currentClient: ws_WebSocket,
    message: Readonly<T>
  ): void {
    this.wsServer.clients.forEach(async (client) => {
      if (client != currentClient && this.isAlive(client)) {
        client.send(JSON.stringify(message));
      }
    });
  }

  protected broadcastAll(message: Readonly<T>): void {
    this.wsServer.clients.forEach(async (client) => {
      if (this.isAlive(client)) {
        client.send(JSON.stringify(message));
      }
    });
  }

  protected replyToUserexceptSender(
    userId: number,
    message: Readonly<T>,
    sender?: ws_WebSocket
  ): void {
    const message_str = JSON.stringify(message);
    this.clientsByUserId
      .find((user) => user.userId === userId)
      ?.clients.forEach(async (client) => {
        if (client !== sender && this.isAlive(client)) {
          client.send(message_str);
        }
      });
  }

  protected async replyTo(
    client: ws_WebSocket,
    message: Readonly<T>
  ): Promise<void> {
    client.send(JSON.stringify(message));
  }

  protected get clients(): { userId: number; clients: ws_WebSocket[] }[] {
    return this.clientsByUserId;
  }

  private isAlive(client: ws_WebSocket): boolean {
    return !this.isDead(client);
  }

  private isDead(client: ws_WebSocket): boolean {
    return client.readyState === CLOSING || client.readyState === CLOSED;
  }
}
