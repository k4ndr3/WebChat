import { WsErrorMessage } from "./ErrorMessage";

export enum MessageNames {
  Error = "ERROR",

  Test = "TEST",
}

type MessageGeneric = {
  [key in MessageNames]: unknown;
};

export interface MessageTypes extends MessageGeneric {
  [MessageNames.Error]: WsErrorMessage;

  [MessageNames.Test]: string;
}

export interface Message<T extends keyof MessageTypes> {
  type: T;
  payload: MessageTypes[T];
}
