import express, { Express } from 'express'
import cors from 'cors';

export function AppMiddlewares(app: Express) {
  app.use(express.json());
  app.use(express.static('public'));

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
}