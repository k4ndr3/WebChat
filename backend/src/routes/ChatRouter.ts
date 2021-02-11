import { Router } from "express";
import { chatController } from "../controller";

const ChatRouter = Router();

ChatRouter.get("/", chatController.index);

ChatRouter.post("/", chatController.create);

ChatRouter.get("/:id", chatController.show);

ChatRouter.put("/:id", chatController.update);

ChatRouter.post("/:id/user", chatController.addUser);

ChatRouter.post("/:id/users", chatController.addUsers);

ChatRouter.delete("/:id", chatController.delete);

export { ChatRouter };
