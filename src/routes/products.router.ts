import { Router } from 'express';
import productManager from '../controllers/product.controller';
import upload from '../utils/multer/multer';
import authenticateJWT from '../middlewares/auth';
const productController = new productManager()
const productRouter = Router();

productRouter.get('/products', productController.findAllProds);
productRouter.get('/products/:id', productController.findProdById);
productRouter.put('/products/:id', authenticateJWT, upload.single('image'), productController.updateProd);
productRouter.post('/products', authenticateJWT, upload.single('image'), productController.addProduct);
productRouter.delete('/products/:id', authenticateJWT, productController.deleteById);

export default productRouter;