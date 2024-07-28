import { Request, Response, NextFunction } from 'express';

function GET() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const [req, res, next] = args as [Request, Response, NextFunction];

      try {
        const result = await originalMethod.apply(this, args);
        if (!res.headersSent) {
          res.status(200).json(result);
        }
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}

function POST() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const [req, res, next] = args as [Request, Response, NextFunction];

      try {
        const result = await originalMethod.apply(this, args);
        if (!res.headersSent) {
          res.status(201).json(result);
        }
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}

export { GET, POST };
