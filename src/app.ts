import express, { Request, Response } from 'express';
import envConfig from "./config/env.config"
import productRouter from './routes/products.router';
import { syncDatabase } from './DAO';
import cors from 'cors';

const app = express();
const port = envConfig.port;

syncDatabase();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send('Halloooo¡¡¡ America Ya :D ');
});

app.use('/api', productRouter);

app.listen(port, async () => {
    try {
        console.log('Connection has been established successfully.');
        console.log(`Servidor escuchando http://localhost:${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});