import Product, { ProductAttributes, ProductCreationAttributes } from '../DAO/models/product.model';
import { AppError, ErrorLevels } from '../middlewares/errorHandler';

class ProductService {
  async createProduct(data: ProductCreationAttributes): Promise<Product> {
    try {
      const product = await Product.create(data);
      return product;
    } catch (error) {
      throw new AppError('Error creating product', 500, error, ErrorLevels.WARNING);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw new AppError('Error fetching products', 500, error, ErrorLevels.CRITICAL);
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new AppError('Product not found', 404, null, ErrorLevels.WARNING);
      }
      return product;
    } catch (error) {
      throw new AppError('Error fetching product', 500, error, ErrorLevels.CRITICAL);
    }
  }

  async updateProduct(id: string, data: Partial<ProductAttributes>): Promise<Product> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new AppError('Product not found', 404, null, ErrorLevels.WARNING);
      }
      if (data.imageUrl === undefined) {
        data.imageUrl = product.imageUrl; // Mantén el valor anterior si no se proporciona un nuevo valor
      }
      await product.update(data);
      return product;
    } catch (error) {
      throw new AppError('Error updating product', 500, error, ErrorLevels.CRITICAL);
    }
  }
}

export default ProductService;
