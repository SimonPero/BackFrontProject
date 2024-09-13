import { Response, Router } from "express";
import { createUserToken } from "../utils/jwt/jwt";
import { services } from "../utils/serviceContainer";

const userService = services.getUserService();
const authRouter = Router();

authRouter.post("/auth/token", async (req: any, res: Response) => {
  const { email, name, surname } = req.body;
  let user = await userService.getUserByEmail(email);
  console.log(user);
  if (user === null) {
    user = await userService.createUser({
      email,
      name,
      surname,
      phone: "+54",
      location: "unknown",
      age: 13,
      password: "",
    });
  }
  createUserToken(user, res);
});

export default authRouter;
