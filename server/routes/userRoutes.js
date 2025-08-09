import express from "express";
import { 
    getHouses, 
    getUserData, 
    loginUser, 
    registerUser 
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

// User registration & login
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// User profile data
userRouter.get('/data', protect, getUserData);

// Publicly available houses listing
userRouter.get('/houses', getHouses);

export default userRouter;
