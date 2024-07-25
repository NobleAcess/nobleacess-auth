import { Express } from 'express'
import routesAuth from '../routes/auth'

export const RoutesMiddleware = (app: Express) => {
  app.use("/auth/", routesAuth)
}