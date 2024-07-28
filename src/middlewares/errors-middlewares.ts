import { Express, NextFunction, Request, Response } from 'express'

export function ErrorsMiddlewares(app: Express) {
  app.use((err: any, httpRequest: Request, httpResponse: Response, next: NextFunction) => {
    console.log('Erro:', err);
    console.log('status:', err.statusCode);
    if (err.statusCode) {
      httpResponse.status(err.statusCode).json({ error: err.message });
    } else {
      httpResponse.status(500).json({ error: 'Internal Server Error' });
    }
  })
}