import { Router } from "express";
import UsersController from "../controllers/users.controller";
import validatorSchema from "../middlewares/validatorSchema";
import * as schema from "../utils/schemas/users.schemas";
const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post("/register", validatorSchema(schema.register,"body"), usersController.createUser)
usersRouter.post("/login", validatorSchema(schema.login,"body"), usersController.logUsers)

export default usersRouter;