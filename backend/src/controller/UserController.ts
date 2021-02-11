import { Request, Response } from "express";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import {
  UserAttributes,
  UserCreationAttributes,
  User,
} from "../models/database";

export const JSEASSIONID = "JSEASSIONID";

export class UserController {
  /**
   * PostLogin
   */
  public Login(req: Request, res: Response): void {
    const { username, password } = req.body;

    if (username && password) {
      User.findOne({
        where: { username: username, password: password },
      }).then(
        (value) => {
          console.log(value);
          if (value !== null) {
            res
              .cookie(JSEASSIONID, value.id, { httpOnly: true, secure: false })
              .send("LoggedIn");
          } else {
            res.status(401).send("Username or password is wrong");
          }
        },
        (reason) => {
          console.log(reason);
        }
      );
    } else {
      res.status(401).send("Couldn't login");
    }
  }

  public Logout(req: Request, res: Response): void {
    res.clearCookie(JSEASSIONID);
    res.send();
  }

  public index(req: Request, res: Response): void {
    User.findAll<User>({})
      .then((nodes: Array<User>) => res.json(nodes))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response): void {
    const params: UserCreationAttributes = req.body;

    User.create<User>(params)
      .then((node: User) => res.status(201).json(node))
      .catch((err: Error) => res.status(500).json(err));
  }

  public show(req: Request, res: Response): void {
    const userId = Number(req.params.id);

    User.findByPk<User>(userId)
      .then((node: User | null) => {
        if (node) {
          res.json(node);
        } else {
          res.status(404).json({ errors: ["UserModel not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response): void {
    const userId = Number(req.params.id);
    const params: UserAttributes = req.body;

    const update: UpdateOptions<UserAttributes> = {
      where: { id: userId },
      limit: 1,
    };

    User.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response): void {
    const userId = Number(req.params.id);
    const options: DestroyOptions<User> = {
      where: { id: userId },
      limit: 1,
    };

    User.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}

export const userController = new UserController();
