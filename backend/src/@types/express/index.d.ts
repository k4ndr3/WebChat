declare namespace Express {
  export interface Request {
    user?: import("../../models/database/user.model").User | null;
  }
}
