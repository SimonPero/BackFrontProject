import { Product } from "../../DAO"
import { ProductAttributes, ProductCreationAttributes } from "../../DAO/models/product.model"

export interface IProductService {
    createProduct(data: ProductCreationAttributes): Promise<Product>
    getAllProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product>
    updateProduct(id: string, data: Partial<ProductAttributes>): Promise<Product>
    deleteProductById(productId: string, imgUrl: string | null): void
}