import { Response, Router } from "express";
import { createUserToken } from "../utils/jwt/jwt";
import { services } from "../utils/serviceContainer";

const authRouter = Router();

authRouter.post("/auth/token", async (req: any, res: Response) => {
    const { email, name, surname } = req.body;

    //verify if user exist or create one
    let user = await services.userService.getUserByEmail(email)
    if (!user) {
        user = await services.userService.createUser({
            email,
            name,
            surname,
            phone: "+54",
            location: "unknown",
            age: 13,
            password: ""
        })
    }
    createUserToken(user, res)
})

export default authRouter;