import { Router } from 'express';
import productManager from '../controllers/product.controller';

const productController = new productManager()
const productRouter = Router();

productRouter.get('/products', productController.findAllProds);
productRouter.post('/products', productController.addProduct);

export default productRouter;