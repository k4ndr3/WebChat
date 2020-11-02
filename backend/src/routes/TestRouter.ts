import { Router } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { testController } from "../controller";

const TestRouter = Router();

TestRouter.get("/test", testController.GetTest);

export { TestRouter };
