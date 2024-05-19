import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { employeesRouter } from './routes/employees.router';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const app = express();
const port = process.env.PORT || 3000;


app.get("/", (req:Request, res:Response) => {
    res.send('Halloooo¡¡¡ America Ya :D ');
});

app.use("/employees", employeesRouter)

app.listen(port, () => { 
    console.log(`Servidor escuchando http://localhost:${port}`);
});