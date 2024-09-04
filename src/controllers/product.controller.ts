import { Request, Response, NextFunction } from "express";
import { services } from "../utils/serviceContainer";

const productService = services.getProductService();

export default class ProductController {
  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productData = req.body;
      if (req.file) {
        const imageUrl = `/images/temp/${req.file.filename}`;
        productData.imageUrl = imageUrl;
      }
      const product = await productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async findAllProds(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProducts();
      if (products.length === 0) {
        res.status(200).json({ message: "La tabla de productos está vacía" });
      } else {
        res.status(200).json(products);
      }
    } catch (error) {
      next(error);
    }
  }
  async findProdsPages(req: Request, res: Response, next: NextFunction) {
    try {
      const pageN = req.params.pageN;
      const products = await productService.getAllProducts(parseInt(pageN));
      if (products.length === 0) {
        res.status(200).json([]);
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
      const updatedProduct = await productService.updateProduct(
        req.params.id,
        productData
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const prod = await productService.getProductById(req.params.id);
      const result = await productService.deleteProductById(
        req.params.id,
        prod.imageUrl
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
