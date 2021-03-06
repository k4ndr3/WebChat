import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { Chat, User } from ".";

export interface MessageAttributes {
  id: number;
  message: string;

  ChatId: number;
  UserId: number;
}

type MessageCreationAttributes = Optional<MessageAttributes, "id">;

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes {
  public id!: number;
  // public idMatchingUserChat!: number;
  // public idUser!: number;
  public message!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign Keys
  public ChatId!: number;
  public UserId!: number;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public creteUser!: BelongsToCreateAssociationMixin<User>;
  public setUser!: BelongsToSetAssociationMixin<User, number>;

  public getChat!: BelongsToGetAssociationMixin<Chat>;
  public createChat!: BelongsToCreateAssociationMixin<Chat>;
  public setChat!: BelongsToSetAssociationMixin<Chat, number>;

  public readonly users?: User;
  public readonly chat?: Chat;

  public static associations: {
    users: Association<Message, User>;
    chat: Association<Message, Chat>;
  };
}

export function initializeMessage(sequelize: Sequelize): void {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      ChatId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "message",
      sequelize: sequelize,
    }
  );
}
