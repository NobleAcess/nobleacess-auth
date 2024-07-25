import express, { Request, Response } from 'express';
import cors from 'cors';
import routersMiddleware from './middlewares/routes-middlewares';
import connectDB from './database/mongo';
import { Run } from './load';
import { ErrorWrapper } from './middlewares/ErrorWrapper';

const app = express();
const port = 3333;


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

routersMiddleware(app)

app.use(express.json());
app.use(express.static('public'));

app.use(ErrorWrapper);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

connectDB();

app.listen(port, () => {
  Run();
  console.log(`Server is running on http://localhost:${port}`);
});

