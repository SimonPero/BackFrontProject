import { Router } from 'express';
import productManager from '../controllers/product.controller';
import upload from '../utils/multer/multer';
const productController = new productManager()
const productRouter = Router();

productRouter.get('/products', productController.findAllProds);
productRouter.get('/products/:id', productController.findProdById);
productRouter.put('/products/:id', productController.updateProd);
productRouter.post('/products', upload.single('image'), productController.addProduct);

export default productRouter;