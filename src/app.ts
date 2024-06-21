import express, { Request, Response } from 'express';
import envConfig from "./config/env.config"
import productRouter from './routes/products.router';
import { syncDatabase } from './DAO';
import cors from 'cors';
import path from 'path';
import errorHandler from './middlewares/errorHandler';
import usersRouter from './routes/users.router';
import authRouter from './routes/auth.router';

const app = express();
const port = envConfig.port


syncDatabase();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send('Halloooo¡¡¡ America Ya :D ');
});
app.use('/api', authRouter);
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