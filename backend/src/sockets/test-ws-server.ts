import { assertUnreachable } from "../helpers";
import { Message, MessageNames } from "../models";
import * as ws_WebSocket from "ws";
import { MessageServer } from ".";

export class SvgWebSocketServer extends MessageServer<Message<MessageNames>> {
  constructor(wsServer: ws_WebSocket.Server) {
    super(wsServer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onStartConnection(socket: ws_WebSocket): void {
    setTimeout(() => {
      // Something to send on Client Connected
    }, 200);
  }

  protected handleMessage(
    sender: ws_WebSocket,
    message: Message<MessageNames>
  ): void {
    console.log("Recieved Message: ", message);

    switch (message.type) {
      case MessageNames.Test:
        this.handleTest(sender, <Message<MessageNames.Test>>message);
        break;

      case MessageNames.Error:
        this.handleError(sender, <Message<MessageNames.Error>>message);
        break;

      default:
        this.replyTo(sender, <Message<MessageNames.Error>>{
          correlationId: "Error",
          type: MessageNames.Error,
          payload: {
            title: `Type ${message.type} could not be evaluated`,
            message: `Handler for Message Type is not defined in Backend`,
          },
        });
        assertUnreachable(message.type);
        break;
    }
  }

  private handleTest(
    sender: ws_WebSocket,
    message: Message<MessageNames.Test>
  ): void {
    const updatedMessage: Message<MessageNames.Test> = {
      type: MessageNames.Test,
      payload: `Recieved Mesage '${message.payload}'`,
    };

    this.replyTo(sender, updatedMessage);
  }

  private handleError(
    requestor: ws_WebSocket,
    message: Message<MessageNames.Error>
  ): void {
    console.error(message, new Error().stack);
  }
}
