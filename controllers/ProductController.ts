import { Request, Response } from "express";
import { auth } from "./../utils/auth";
import ProductRepository from "../repositories/ProductRepository";
import prisma from "../utils/prisma";

const productRepository = new ProductRepository(prisma);

class ProductController {
  static async index(req: any, res: Response) {
    const user_id = req?.auth?.userId || null;
    try {
      const user = await auth(user_id);
      const { limit, offset, category, author, search, published } = req.query;
      const where: any = {
        AND: [
          user?.id ? { author: { id: user.id } } : {},
          category ? { category: { id: parseInt(category) } } : {},
          author ? { author: { name: author as string } } : {},
          published ? { published: published == "true" } : {},
          search
            ? { name: { contains: search as string, mode: "insensitive" } }
            : {},
        ],
      };
      if (where.AND.length === 0) {
        delete where.AND;
      }
      const take = limit ? parseInt(limit as string, 10) : undefined;
      const skip = offset ? parseInt(offset as string, 10) : undefined;
      const products = await productRepository.findMany({
        where,
        take,
        skip,
      });

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(req: any, res: Response) {
    const { title, category, content, thumbnail } = req.body;
    const user_id: string = req?.auth?.userId || null;
    const user = await auth(user_id);
    try {
      const result = await productRepository.create({
        title: title || "",
        category_id: category,
        content: content,
        thumbnailUrl: thumbnail,
        author_id: user?.id || 1,
        createdAt: new Date(),
      });

      res.json({ product: result });
    } catch (error) {
      res.status(401).json("Bad request");
    }
  }

  static async show(req: any, res: Response) {
    const user_id = req?.auth?.userId || null;
    const user = await auth(user_id);
    const { id } = req.params;
    try {
      const product = await productRepository.findFirst(
        parseInt(id, 10),
        user?.id
      );

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    res.send("Product route");
  }

  static async delete(req: Request, res: Response) {
    res.send("Product route");
  }
}

export default ProductController;
