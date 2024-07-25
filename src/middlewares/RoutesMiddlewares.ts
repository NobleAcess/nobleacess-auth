import { Express } from 'express'
import routesAuth from '../routes/auth'

export default (app: Express) => {
  app.use("/auth/", routesAuth)
}