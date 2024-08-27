import Product, {
  ProductAttributes,
  ProductCreationAttributes,
} from "../../DAO/models/product.model";
import { AppError, ErrorLevels } from "../../utils/customError/errors";
import fs from "fs";
import path from "path";
import { IProductService } from "./IProductService";

class ProductService implements IProductService {
  async createProduct(data: ProductCreationAttributes): Promise<Product> {
    try {
      const product = await Product.create(data);
      //buscar codigo para cuando falla la creacion
      if (!product) {
        throw new AppError(
          "Product not created",
          404,
          null,
          ErrorLevels.WARNING
        );
      }
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error creating product",
          500,
          error,
          ErrorLevels.WARNING
        );
      }
    }
  }

  async getAllProducts(offsetN = 1): Promise<Product[]> {
    try {
      const products = await Product.findAll({
        offset: (offsetN - 1) * 1,
        limit: 1,
        order: [["productID", "DESC"]],
      });

      if (!products) {
        throw new AppError(
          "Products not found",
          404,
          null,
          ErrorLevels.WARNING
        );
      }
      return products;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error fetching products",
          500,
          error,
          ErrorLevels.CRITICAL
        );
      }
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new AppError("Product not found", 404, null, ErrorLevels.WARNING);
      }
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error fetching product",
          404,
          error,
          ErrorLevels.CRITICAL
        );
      }
    }
  }

  async updateProduct(
    id: string,
    data: Partial<ProductAttributes>
  ): Promise<Product> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new AppError("Product not found", 404, null, ErrorLevels.WARNING);
      }
      if (!data.imageUrl) {
        data.imageUrl = product.imageUrl; // Mantén el valor anterior si no se proporciona un nuevo valor
      }
      await product.update(data);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error updating product",
          500,
          error,
          ErrorLevels.CRITICAL
        );
      }
    }
  }
  async deleteProductById(productId: string, imgUrl: string | null) {
    try {
      const deletedCount = await Product.destroy({
        where: {
          productID: productId,
        },
      });
      if (deletedCount === 0) {
        throw new AppError("Product not found", 404, null, ErrorLevels.WARNING);
      }
      // Elimina la imagen del sistema de archivos
      if (imgUrl !== null) {
        const imagePath = path.join("src/public", imgUrl);
        fs.unlink(imagePath, (err) => {
          if (err) {
            throw new AppError(
              "Error deleting image",
              500,
              err,
              ErrorLevels.CRITICAL
            );
          }
        });
      }
      return "borrado";
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          "Error deleting product",
          500,
          error,
          ErrorLevels.CRITICAL
        );
      }
    }
  }
}

export default ProductService;
