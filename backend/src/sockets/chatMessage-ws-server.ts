import { assertUnreachable } from "../helpers";
import { Message, MessageNames } from "../models";
import * as ws_WebSocket from "ws";
import { MessageServer } from ".";
import { Chat, Message as MessageDb, User } from "../models/database";

export class ChatWebSocketServer extends MessageServer<Message<MessageNames>> {
  constructor(wsServer: ws_WebSocket.Server) {
    super(wsServer);
  }

  private clients2: { user: number; socket: ws_WebSocket }[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onStartConnection(socket: ws_WebSocket): void {
    setTimeout(() => {
      // Something to send on Client Connected
      this.replyTo(socket, <Message<MessageNames.Connected>>{
        type: MessageNames.Connected,
        payload: "Connection established",
      });
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

      case MessageNames.Message:
        this.handleChatMessage(sender, <Message<MessageNames.Message>>message);
        break;

      // Not needed to handle here
      case MessageNames.Connected:
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

  async handleChatMessage(
    sender: ws_WebSocket,
    message: Message<MessageNames.Message>
  ): Promise<void> {
    const chat = await Chat.findByPk(message.payload.chatId, {
      include: typeof User,
    });

    MessageDb.create(
      {
        message: message.payload.message,
        ChatId: message.payload.chatId,
        UserId: message.payload.userId,
      },
      {}
    );

    chat?.users?.forEach((chatUser) => {
      this.replyToUserexceptSender(chatUser.id, message, sender);
    });
  }
}
