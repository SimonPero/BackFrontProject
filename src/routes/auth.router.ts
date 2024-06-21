import { Request, Response, Router } from "express";
import UserService from "../services/user.service";
import { createUserToken } from "../utils/jwt/jwt";

const authRouter = Router();
const userService = new UserService();

authRouter.post("/auth/token", async (req:Request, res:Response)=>{
    const {email, name, surname} = req.body;

    //verify if user exist or create one
    let user = await userService.getUserByEmail(email)
    if(!user){
        user = await userService.createUser({
            email, 
            name,
            surname,
            phone: "+54",
            location: "unknown",
            age: 13,
            password: ""
        })
    }
    createUserToken(user, res, req)
})

export default authRouter;