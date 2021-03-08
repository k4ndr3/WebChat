import { Request, Response } from "express";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import {
  ChatAttributes,
  ChatCreationAttributes,
  Chat,
} from "../models/database";

export class ChatController {
  public index(req: Request, res: Response): void {
    if (req.user) {
      req.user
        ?.getChats()
        .then((nodes: Array<Chat>) => res.json(nodes))
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(401).send("Not Logged In");
    }
  }

  public create(req: Request, res: Response): void {
    const params: ChatCreationAttributes = req.body;

    Chat.create<Chat>(params)
      .then((node: Chat) => {
        req.user?.addChat(node).then(() => {
          res.status(201).json(node);
        });
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const chatId = Number(req.params.id);

    if (await req.user?.hasChat(chatId)) {
      Chat.findByPk<Chat>(chatId, {
        include: [Chat.associations.users, Chat.associations.messages], // [Chat.associations.message, Chat.associations.users],
      })
        .then((chat) => {
          console.log(chat);

          if (chat) {
            res.json(chat);
          } else {
            res.status(404).json({ errors: ["ChatModel not found"] });
          }
        })
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(401).send("User is not Member of this Chat");
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const chatId = Number(req.params.id);
    const params: ChatAttributes = req.body;

    if (await req.user?.hasChat(chatId)) {
      const update: UpdateOptions<ChatAttributes> = {
        where: { id: chatId },
        limit: 1,
      };

      Chat.update(params, update)
        .then(() => res.status(202).json({ data: "success" }))
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(401).send("User is not Member of this Chat");
    }
  }

  public async addUser(req: Request, res: Response): Promise<void> {
    const chatId = Number(req.params.id);
    const userId: number = req.body.userId;

    if (await req.user?.hasChat(chatId)) {
      Chat.findByPk(chatId)
        .then((chat) => {
          if (chat) {
            chat.addUser(userId);
            res.send({ data: "sucess" });
          } else {
            res.status(404).send("Chat not found");
          }
        })
        .catch((reason) => {
          res.send(500).send(`An error Accured during add User.\n\t${reason}`);
        });
    } else {
      res.status(401).send("User is not Member of this Chat");
    }
  }

  public async addUsers(req: Request, res: Response): Promise<void> {
    const chatId = Number(req.params.id);
    const newUserIds: number[] = req.body.userIds;

    if (await req.user?.hasChat(chatId)) {
      Chat.findByPk(chatId)
        .then((chat) => {
          if (chat) {
            for (const userId of newUserIds) {
              chat.addUser(userId);
            }
            res.send({ data: "sucess" });
          } else {
            res.status(404).send("Chat not found");
          }
        })
        .catch((reason) => {
          res.send(500).send(`An error Accured during add User.\n\t${reason}`);
        });
    } else {
      res.status(401).send("User is not Member of this Chat");
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const chatId = Number(req.params.id);
    const options: DestroyOptions<Chat> = {
      where: { id: chatId },
      limit: 1,
    };

    if (await req.user?.hasChat(chatId)) {
      Chat.destroy(options)
        .then(() => res.status(204).json({ data: "success" }))
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(401).send("User is not Member of this Chat");
    }
  }
}

export const chatController = new ChatController();
