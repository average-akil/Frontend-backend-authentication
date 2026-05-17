import { Router } from "express";
import {
  userSignUp,
  userSignIn,
  getCurrentUser,
} from "../controllers/AuthControllers.js";

const router = Router();

router.post("/sign-up", userSignUp);
router.post("/sign-in", userSignIn);
router.get("/me", getCurrentUser);

export default router;
