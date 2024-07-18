import z from "zod"

export const product = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    size: z.string().min(1),
    price: z.string().transform((val) => {
        const parsed = parseFloat(val);
        if (isNaN(parsed)) throw new Error("Invalid price");
        return parsed;
    }),
    stock: z.string().transform((val) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) throw new Error("Invalid stock");
        return parsed;
    }),
    category: z.string().min(1),
});