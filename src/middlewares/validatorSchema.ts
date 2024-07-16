import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod"

type RequestProperty = "body" | "query" | "params"


export default function validatorSchema(schema: ZodSchema, property: RequestProperty = "body") {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req[property]);
            if (result.success) {
                req[property] = result.data;
                next();
            } else {
                res.status(400).json({ errors: result.error.errors });
            }
        } catch (error) {
            next(error);
        }
    }
}