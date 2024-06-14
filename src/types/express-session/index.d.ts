import User from "../../DAO/models/user.model";
import { SessionData } from "express-session";

declare module 'express-session' {
    interface SessionData {
      jwt?: string
    }
}