import { Sequelize } from 'sequelize';
import envConfig from './env.config';
const db = envConfig.database;
const user = envConfig.mySqlUser;
const pass = envConfig.mySqlPass;
const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;