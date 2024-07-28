import express from 'express';
import { RoutesMiddlewares, AppMiddlewares, ErrorsMiddlewares } from './middlewares';
import connectDB from './database/mongo';
import { Run } from './load';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

AppMiddlewares(app);
RoutesMiddlewares(app)
ErrorsMiddlewares(app);

connectDB();

app.listen(process.env.PORT, () => {
  Run();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});