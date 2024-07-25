import express, { Request, Response } from 'express';
import cors from 'cors';
import routersMiddleware from './middlewares/routes-middlewares';
import connectDB from './database/mongo';
import { Run } from './load';
import { ErrorWrapper } from './middlewares/ErrorWrapper';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

routersMiddleware(app)

app.use(express.json());
app.use(express.static('public'));

app.use(ErrorWrapper);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

connectDB();

app.listen(process.env.PORT, () => {
  Run();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

