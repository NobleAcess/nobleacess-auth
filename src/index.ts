import express, { Request, Response } from 'express';
import cors from 'cors';
import routersMiddleware from './middlewares/RoutesMiddlewares';
import appMiddleware from './middlewares/AppMiddlewares';
import connectDB from './database/mongo';
import { Run } from './load';
import { ErrorWrapper } from './middlewares/ErrorWrapper';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

routersMiddleware(app)
appMiddleware(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

connectDB();

app.listen(process.env.PORT, () => {
  Run();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

