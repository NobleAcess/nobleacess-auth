import { Router } from "express"
import AuthController from "../controllers/auth-controller";
import { resolver } from "../helpers/ExpressRouterAdapter";

const router = Router()

router.get("/", AuthController.findAll)
router.post("/", AuthController.create)
router.post("/authentication", resolver(AuthController.Authentication))

export default router;