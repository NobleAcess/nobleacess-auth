import { Express } from 'express'
import routesAuth from '../routes/auth-routes'

export function RoutesMiddlewares(app: Express) {
  app.use("/auth/", routesAuth)
}