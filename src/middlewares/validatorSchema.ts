import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod"

type RequestProperty = "body" | "query" | "params"


export default function validatorSchema(schema: ZodSchema, property: RequestProperty = "body"){
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req[property] = schema.parse(req[property])
            next()
        } catch (error) { 
            next(error)
        }
    }
}