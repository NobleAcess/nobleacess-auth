import { Router } from "express"
import AuthController from "../controllers/auth-controller";
import { resolver } from "../helpers/resolver-helpers";

const router = Router()

router.get("/", AuthController.findAll)
router.post("/", AuthController.create)
router.get("/:id", AuthController.findById)
router.post("/authentication", resolver(AuthController.Authentication))

export default router;