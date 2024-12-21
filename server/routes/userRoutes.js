const express =require("express");
const userRouter = express.Router();
const {Register,Login,HomePage}=require("../controllers/userController")
const authMiddleware =require("../middlewares/authMiddleware")

userRouter.post("/register",Register)
userRouter.post("/login",Login)
userRouter.get("/home",authMiddleware,HomePage)


module.exports={userRouter}