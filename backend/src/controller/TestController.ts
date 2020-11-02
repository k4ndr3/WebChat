import { Request, Response } from "express";

export class TestController {
  /**
   * GetTest
   */
  public GetTest(req: Request, res: Response): void {
    res.send({ test: "Some Data" });
  }
}

export const testController = new TestController();
