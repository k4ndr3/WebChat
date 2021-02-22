import { DataTypes } from "sequelize";
import { database } from "../config/database";
import {
  User,
  Message,
  Chat,
  initializeChat,
  initializeMessage,
  initializeUser,
} from "../models/database";

export function initializeDatabase(): void {
  try {
    initializeChat(database);
    initializeMessage(database);
    initializeUser(database);

    const ChatMembers = database.define("ChatMembers", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    });

    Message.belongsTo(User);
    User.hasMany(Message);

    Message.belongsTo(Chat);
    Chat.hasMany(Message);

    Chat.belongsToMany(User, { through: ChatMembers });
    User.belongsToMany(Chat, { through: ChatMembers });

    Promise.all([
      // Basic Tables (have to be created bevore you can have Foreign Keys from this Tables)
      User.sync({ alter: true }).then(() => console.log("User table created")),
      Chat.sync({ alter: true }).then(() => console.log("Chat table created")),
    ]).then(() => {
      // Tables with Foreign Key Constrains to Tables bevore
      ChatMembers.sync({ alter: true }).then(() =>
        console.log("ChatMembers table created")
      );
      Message.sync({ alter: true }).then(() =>
        console.log("Message table created")
      );
    });
  } catch (error) {
    console.error(error);
  }
}
