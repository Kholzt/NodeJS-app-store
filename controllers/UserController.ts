import { Request, Response } from "express";
import prisma from "../utils/prisma";

class UserController {
  static async index(req: Request, res: Response) {
    const users = await prisma.users.findMany();
    res.json(users);
  }
  static async create(req: Request, res: Response) {
    res.send("User route");
  }
  static async show(req: Request, res: Response) {
    res.send("User route");
  }
  static async update(req: Request, res: Response) {
    res.send("User route");
  }
  static async delete(req: Request, res: Response) {
    res.send("User route");
  }
}

export default UserController;
