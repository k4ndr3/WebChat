import { Sequelize } from "sequelize";

import mysql from "mysql2/promise";

const host = "localhost";
const port = 3306;
const user = "root";
const password = "";
const database_name = "web_chat";

mysql.createConnection({ host, port, user, password }).then((connection) => {
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
});

// export const database = new Sequelize("mysql://root:@localhost:3306/web_chat");
export const database = new Sequelize(database_name, user, password, {
  host,
  port,
  dialect: "mysql",
});
