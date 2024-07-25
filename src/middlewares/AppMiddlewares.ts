import express, { Express } from 'express';
import { ErrorWrapper } from './ErrorWrapper';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.static('public'));

  app.use(ErrorWrapper);
}