import z from "zod"

export const product = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    size: z.string().min(1),
    price: z.string().transform((val) => parseFloat(val)),
    stock: z.string().transform((val) => parseInt(val, 10)),
    category: z.string(),
    image: z.string().optional(),
});