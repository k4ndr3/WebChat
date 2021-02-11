import { Router } from "express";
import { userController } from "../controller";

const UserRouter = Router();

UserRouter.post("/login", userController.Login);

UserRouter.post("/logout", userController.Logout);

UserRouter.get("/", userController.index);

UserRouter.post("/", userController.create);

UserRouter.get("/:id", userController.show);

UserRouter.put("/:id", userController.update);

UserRouter.delete("/:id", userController.delete);

export { UserRouter };
