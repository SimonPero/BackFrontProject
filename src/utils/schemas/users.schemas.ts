import {z} from "zod"

export const login = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});
export const register = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    surname: z.string().min(6),
    password: z.string().min(5),
    phone:z.string(),
    age:z.number(),
    location:z.string(),
});