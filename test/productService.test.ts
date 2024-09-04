import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import Product from "../src/DAO/models/product.model";
import ProductService from "../src/services/products/product.service";
import { AppError } from "../src/utils/customError/errors";

jest.mock("../src/DAO/models/product.model");

describe("Product Service", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should fetch products from the database", async () => {
      const mockProducts = [
        { productID: 1, name: "Product 1" },
        { productID: 2, name: "Product 2" },
      ] as Product[];

      (
        Product.findAll as jest.MockedFunction<typeof Product.findAll>
      ).mockResolvedValue(mockProducts);

      const result = await productService.getAllProducts(1);

      expect(result).toEqual(mockProducts);
      expect(Product.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 1,
        order: [["productID", "DESC"]],
      });
    });

    it("should return an empty array when no products are found", async () => {
      (
        Product.findAll as jest.MockedFunction<typeof Product.findAll>
      ).mockResolvedValue([]);

      const result = await productService.getAllProducts(1);

      expect(result).toEqual([]);
      expect(Product.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 1,
        order: [["productID", "DESC"]],
      });
    });

    it("should throw an AppError when an unexpected error occurs", async () => {
      (
        Product.findAll as jest.MockedFunction<typeof Product.findAll>
      ).mockRejectedValue(new Error("Database error"));

      await expect(productService.getAllProducts(1)).rejects.toThrow(AppError);
    });
  });
  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const mockProduct = { productID: 1, name: "New Product" } as Product;
      (
        Product.create as jest.MockedFunction<typeof Product.create>
      ).mockResolvedValue(mockProduct);

      const result = await productService.createProduct(mockProduct);

      expect(result).toEqual(mockProduct);
      expect(Product.create).toHaveBeenCalledWith(mockProduct);
    });

    it("should throw an AppError when product creation fails", async () => {
      (
        Product.create as jest.MockedFunction<typeof Product.create>
      ).mockResolvedValue(undefined as any);

      await expect(productService.createProduct({} as any)).rejects.toThrow(
        AppError
      );
    });

    it("should throw an AppError when an unexpected error occurs", async () => {
      (
        Product.create as jest.MockedFunction<typeof Product.create>
      ).mockRejectedValue(new Error("Database error"));

      await expect(productService.createProduct({} as any)).rejects.toThrow(
        AppError
      );
    });
  });

  describe("getProductById", () => {
    it("should fetch a product by id", async () => {
      const mockProduct = { productID: 1, name: "Test Product" } as Product;
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(mockProduct);

      const result = await productService.getProductById("1");

      expect(result).toEqual(mockProduct);
      expect(Product.findByPk).toHaveBeenCalledWith("1");
    });

    it("should throw an AppError when product is not found", async () => {
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(null);

      await expect(productService.getProductById("1")).rejects.toThrow(
        AppError
      );
    });

    it("should throw an AppError when an unexpected error occurs", async () => {
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockRejectedValue(new Error("Database error"));

      await expect(productService.getProductById("1")).rejects.toThrow(
        AppError
      );
    });
  });

  describe("updateProduct", () => {
    it("should update a product successfully", async () => {
      const existingProduct = {
        productID: 1,
        name: "Test Product",
        imageUrl: "old-image-url",
        update: jest.fn().mockImplementation(function (this: any, data: any) {
          Object.assign(this, data);
          return Promise.resolve(this);
        }),
      } as unknown as Product;

      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(existingProduct);

      const updatedData = { name: "Updated Product", price: 100 };
      const result = await productService.updateProduct("1", updatedData);

      expect(result).toEqual({
        ...existingProduct,
        ...updatedData,
        imageUrl: "old-image-url", // imageUrl should remain unchanged
      });
      expect(existingProduct.update).toHaveBeenCalledWith(updatedData);
    });

    it("should update a product with new imageUrl", async () => {
      const existingProduct = {
        productID: 1,
        name: "Test Product",
        imageUrl: "old-image-url",
        update: jest.fn().mockImplementation(function (this: any, data: any) {
          Object.assign(this, data);
          return Promise.resolve(this);
        }),
      } as unknown as Product;

      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(existingProduct);

      const updatedData = {
        name: "Updated Product",
        imageUrl: "new-image-url",
      };
      const result = await productService.updateProduct("1", updatedData);

      expect(result).toEqual({
        ...existingProduct,
        ...updatedData,
      });
      expect(existingProduct.update).toHaveBeenCalledWith(updatedData);
    });

    it("should throw an AppError when product is not found", async () => {
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(null);

      await expect(
        productService.updateProduct("1", { name: "Updated Product" })
      ).rejects.toThrow(AppError);
    });

    it("should throw an AppError when an unexpected error occurs", async () => {
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockRejectedValue(new Error("Database error"));

      await expect(
        productService.updateProduct("1", { name: "Updated Product" })
      ).rejects.toThrow(AppError);
    });
  });

  describe("deleteProductById", () => {
    it("should delete a product successfully", async () => {
      const mockProduct = {
        productID: 1,
        name: "Test Product",
        imageUrl: null,
      } as Product;
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(mockProduct);
      (
        Product.destroy as jest.MockedFunction<typeof Product.destroy>
      ).mockResolvedValue(1);

      const result = await productService.deleteProductById("1", null);

      expect(result).toEqual(mockProduct);
      expect(Product.destroy).toHaveBeenCalledWith({
        where: { productID: "1" },
      });
    });

    it("should throw an AppError when product is not found", async () => {
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(null);

      await expect(productService.deleteProductById("1", null)).rejects.toThrow(
        AppError
      );
    });

    it("should throw an AppError when deletion fails", async () => {
      const mockProduct = {
        productID: 1,
        name: "Test Product",
        imageUrl: null,
      } as Product;
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockResolvedValue(mockProduct);
      (
        Product.destroy as jest.MockedFunction<typeof Product.destroy>
      ).mockResolvedValue(0);

      await expect(productService.deleteProductById("1", null)).rejects.toThrow(
        AppError
      );
    });

    it("should throw an AppError when an unexpected error occurs", async () => {
      (
        Product.findByPk as jest.MockedFunction<typeof Product.findByPk>
      ).mockRejectedValue(new Error("Database error"));

      await expect(productService.deleteProductById("1", null)).rejects.toThrow(
        AppError
      );
    });
  });
});
