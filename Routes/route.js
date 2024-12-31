import { Router } from "express";
import {
  getAllTaskController,
  taskControllers,
  updateTaskController,
} from "../Controllers/taskControllers.js";
import {
  loginController,
  logOutControllers,
  registerController,
} from "../Controllers/authController.js";
import isLoggedIn from "../utils/middleware.js";
import authenticateToken from "../utils/middleware.js";
import { verifyToken } from "../utils/verify.js";

const router = Router();

// // create a new task
router.post("/task", taskControllers);

// router.put('/tasks/:id',updateTaskController)

// collect inputs from the frontend
router.post("/reg", registerController);

//  user login
router.post("/login", loginController);

router.get("/gettask", verifyToken, getAllTaskController);

router.put("/tasks/:id", verifyToken, updateTaskController);

router.get("/logout", logOutControllers);

export default router; 
