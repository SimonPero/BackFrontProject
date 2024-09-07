import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Ecommerce", "Simon", "1234", {
  dialect: "mssql",
  host: "127.0.0.1",
  port:1433,
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