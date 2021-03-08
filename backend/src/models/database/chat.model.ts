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
import { Message } from "./message.model";
import { User } from "./user.model";

export interface ChatAttributes {
  id: number;
  chatname: string;
}

export type ChatCreationAttributes = Optional<ChatAttributes, "id">;

export class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes {
  public id!: number;
  public chatname!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUser!: HasManyAddAssociationMixin<User, number>;
  public hasUser!: HasManyHasAssociationMixin<User, number>;
  public countUsers!: HasManyCountAssociationsMixin;

  public getMessages!: HasManyGetAssociationsMixin<Message>;
  public addMessage!: HasManyAddAssociationMixin<Message, number>;
  public hasMessage!: HasManyHasAssociationMixin<Message, number>;
  public countMessages!: HasManyCountAssociationsMixin;
  public createMessage!: HasManyCreateAssociationMixin<Message>;

  public readonly users?: User[];
  public readonly messages?: Message[];

  public static associations: {
    users: Association<Chat, User>;
    messages: Association<Chat, Message>;
  };
}

export function initializeChat(sequelize: Sequelize): void {
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      chatname: {
        type: new DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: "chat",
      sequelize: sequelize,
    }
  );
}
