import { Sequelize } from "sequelize";
import config from "./env.config";

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  dialect: "mssql",
  host: "127.0.0.1",
  port: 1433,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      useUTC: false,
      dateFirst: 1,
    },
  },
});

export default sequelize;
