import express, { Request, Response } from 'express';
import envConfig from "./config/env.config"
import productRouter from './routes/products.router';
import { syncDatabase } from './DAO';
import cors from 'cors';
import path from 'path';
import errorHandler from './middlewares/errorHandler';
import usersRouter from './routes/users.router';
import * as expressSession from "express-session";
import expressMysqlSession from "express-mysql-session";
import mysql from 'mysql2/promise';

// Configuración del pool de conexiones de mysql2
const pool = mysql.createPool({
    host: 'localhost',
    user: envConfig.mySqlUser,
    password: envConfig.mySqlPass,
    database: envConfig.database
});

const MySQLStore = expressMysqlSession(expressSession);

const sessionStore = new MySQLStore({
    schema: {
        tableName: 'user_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, pool as any);

const app = express();
const port = envConfig.port

app.use(expressSession.default({
    secret: 'your_secret_key', //cambiarle a la secret
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

syncDatabase();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send('Halloooo¡¡¡ America Ya :D ');
});
app.use('/api', productRouter);
app.use('/api/users/', usersRouter)
app.use('/images/temp', express.static(path.join(__dirname, '/public/images/temp')));

app.use(errorHandler)

app.listen(port, async () => {
    try {
        console.log('Connection has been established successfully.');
        console.log(`Servidor escuchando http://localhost:${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});