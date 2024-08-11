import { Request, Response } from "express";
import prisma from "../utils/prisma";


class CategoryController {
  static async index(req: any, res: Response) {
    // Get the user details
    const categories = await prisma.categories.findMany();
    res.json(categories);
  }
  static async create(req: Request, res: Response) {
    res.send("Product route");
  }
  static async show(req: any, res: Response) {
    try {
      const category = await prisma.categories.findFirst();
      if (category) {
        res.json(category);
      } else {
        res.status(401).json({ message: "Product not found" }); // Gunakan status 404 untuk data yang tidak ditemukan
      }
    } catch (error) {
      console.error("Error fetching product:", error); // Logging error untuk debugging
      res.status(500).json({ message: "Internal server error" }); // Gunakan status 500 untuk kesalahan server
    }
  }
  static async update(req: Request, res: Response) {
    res.send("Product route");
  }
  static async delete(req: Request, res: Response) {
    res.send("Product route");
  }
}

export default CategoryController;
