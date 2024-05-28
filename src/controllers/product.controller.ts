import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/product.service';

const productService = new ProductService();

export default class ProductController {
  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, name, description, size, price, stock } = req.body;
      const imageUrl = req.file ? `/images/temp/${req.file.filename}` : null;

      const productData = {
        category,
        name,
        description,
        size,
        price,
        stock,
        imageUrl,
      };

      const product = await productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async findAllProds(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProducts();
      if (products.length === 0) {
        res.status(200).json({ message: 'La tabla de productos está vacía' });
      } else {
        res.status(200).json(products);
      }
    } catch (error) {
      next(error);
    }
  }

  async findProdById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProd(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, name, description, size, price, stock } = req.body;
      const imageUrl = req.file ? `/images/temp/${req.file.filename}` : null;

      const productData = {
        category,
        name,
        description,
        size,
        price,
        stock,
        imageUrl,
      };
      const updatedProduct = await productService.updateProduct(req.params.id, productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
}
