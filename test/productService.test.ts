import { describe, expect, it, jest } from "@jest/globals";
import Product from "../src/DAO/models/product.model";
import ProductService from "../src/services/products/product.service";
import { AppError } from "../src/utils/customError/errors";
import ProductController from "../src/controllers/product.controller";
const productService = new ProductService();
const productController = new ProductController();
const mockProducts = [
  {
    productID: 1,
    category: "Electronics",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise-cancellation.",
    size: "Standard",
    price: 99.99,
    stock: 50,
    imageUrl: "https://example.com/images/wireless-headphones.jpg",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-08-01T12:00:00Z"),
  },
  {
    productID: 2,
    category: "Gaming",
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    size: "Medium",
    price: 59.99,
    stock: 30,
    imageUrl: "https://example.com/images/gaming-mouse.jpg",
    createdAt: new Date("2024-01-15T11:00:00Z"),
    updatedAt: new Date("2024-08-05T14:00:00Z"),
  },
] as Product[];

const mockProductCreated = {
  category: "Electronics",
  name: "Wireless Headphones",
  description: "High-quality wireless headphones with noise-cancellation.",
  size: "Standard",
  price: 99.99,
  stock: 50,
  imageUrl: "https://example.com/images/wireless-headphones.jpg",
  createdAt: new Date("2024-01-01T10:00:00Z"),
  updatedAt: new Date("2024-08-01T12:00:00Z"),
} as Product;

const mockProductFail = {
  productID: 1,
  category: "Electronics",
  name: "Wireless Headphones",
  description: "High-quality wireless headphones with noise-cancellation.",
  size: "Standard",
  price: null,
  stock: 50,
  imageUrl: "https://example.com/images/wireless-headphones.jpg",
  createdAt: new Date("2024-01-01T10:00:00Z"),
  updatedAt: new Date("2024-08-01T12:00:00Z"),
} as unknown as Product;

describe("Product Service And Product Controller", () => {
  it("should fetch products from the database", async () => {
    jest
      .spyOn(productService, "getAllProducts")
      .mockResolvedValueOnce(mockProducts);

    const result = await productService.getAllProducts(1);

    expect(result).toEqual(mockProducts);
    expect(productService.getAllProducts).toHaveBeenCalledWith(1);
  });
});
