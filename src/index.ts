import express, { Request, Response } from 'express';
import { AppMiddleware, RoutesMiddleware } from './middlewares';
import connectDB from './database/mongo';
import { Run } from './load';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

RoutesMiddleware(app)
AppMiddleware(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

connectDB();

app.listen(process.env.PORT, () => {
  Run();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

