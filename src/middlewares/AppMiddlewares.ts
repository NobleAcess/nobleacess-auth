import express, { Express } from 'express';
import cors from 'cors';
import { ErrorWrapper } from './ErrorWrapper';

export const AppMiddleware = (app: Express) => {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  app.use(express.json());
  app.use(express.static('public'));

  app.use(ErrorWrapper);
}