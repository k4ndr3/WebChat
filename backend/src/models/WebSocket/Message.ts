import { WsErrorMessage } from "./ErrorMessage";

export enum MessageNames {
  Error = "ERROR",

  Connected = "CONNECTED",

  Test = "TEST",

  Message = "MESSAGE",
}

type MessageGeneric = {
  [key in MessageNames]: unknown;
};

export interface MessageTypes extends MessageGeneric {
  [MessageNames.Error]: WsErrorMessage;

  [MessageNames.Connected]: "Connection established";

  [MessageNames.Test]: string;

  [MessageNames.Message]: { userId: number; chatId: number; message: string };
}

export interface Message<T extends keyof MessageTypes> {
  type: T;
  payload: MessageTypes[T];
}
