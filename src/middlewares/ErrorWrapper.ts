import { NextFunction, Request, Response } from "express";

export const ErrorWrapper = (err: any, httpRequest: Request, httpResponse: Response, next: NextFunction) => {

  if (err.statusCode) {
    httpResponse.status(err.statusCode).json({ error: err.message });
  } else {
    httpResponse.status(500).json({ error: 'Internal Server Error' });
  }
}