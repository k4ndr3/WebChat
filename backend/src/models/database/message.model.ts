import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface MessageAttributes {
  id: number;
  // idMatchingUserChat: number;
  // idUser: number;
  message: string;
}

type MessageCreationAttributes = Optional<MessageAttributes, "id">;

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes {
  public id!: number;
  // public idMatchingUserChat!: number;
  // public idUser!: number;
  public message!: string;
  // public time!: Date; // => createdAt

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    },
    {
      tableName: "message",
      sequelize: sequelize,
    }
  );
}
