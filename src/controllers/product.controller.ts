import { Request, Response } from 'express';
import Product from '../DAO/models/product.model';

export default class productManager{
    async addProduct(req: Request, res: Response) {
        try {
            const { category, name, description, design, size, price, stock } = req.body;
            const product = await Product.create({ category, name, description, design, size, price, stock});
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async findAllProds(req: Request, res: Response) {
        try {
            const prods = await Product.findAll();
            if (prods.length === 0) {
                res.status(200).json({ message: 'La tabla de productos está vacía' });
            } else {
                res.status(200).json(prods);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
