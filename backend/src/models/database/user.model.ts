import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { Chat } from "./chat.model";

export interface UserAttributes {
  id: number;
  username: string;
  password?: string;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getChats!: HasManyGetAssociationsMixin<Chat>;
  public addChat!: HasManyAddAssociationMixin<Chat, number>;
  public hasChat!: HasManyHasAssociationMixin<Chat, number>;
  public countChats!: HasManyCountAssociationsMixin;
  public createChat!: HasManyCreateAssociationMixin<Chat>;

  public readonly chats?: Chat[];

  public static associations: {
    chats: Association<User, Chat>;
  };
}

export function initializeUser(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: "user",
      sequelize: sequelize,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ["password"],
          },
        },
      },
    }
  );
}
