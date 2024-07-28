import { Express } from 'express'
import routesAuth from '../routes/auth'

export function RoutesMiddlewares(app: Express) {
  app.use("/auth/", routesAuth)
}