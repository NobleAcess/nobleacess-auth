import { Handler, NextFunction, Request, Response } from "express";

export const resolver = (handler: Handler) => {
  return (httpRequest: Request, httpResponse: Response, next: NextFunction) => {
    return Promise.resolve(handler(httpRequest, httpResponse, next)).catch(e => next(e));
  }
}