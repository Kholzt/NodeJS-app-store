import { PrismaClient, products } from "@prisma/client";

class ProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findMany(options: {
    where?: any;
    take?: number;
    skip?: number;
  }): Promise<products[]> {
    return this.prisma.products.findMany({
      where: options.where,
      take: options.take,
      skip: options.skip,
      include: {
        attachments: true,
        category: true,
        author: true,
      },
    });
  }

  async findFirst(id: number, authorId?: number): Promise<products | null> {
    return this.prisma.products.findFirst({
      where: {
        id,
        author: authorId ? { id: authorId } : undefined,
      },
      include: {
        attachments: true,
        category: true,
        author: true,
      },
    });
  }

  async create(data: {
    title: string;
    category_id?: number;
    content?: string;
    thumbnailUrl?: string;
    author_id: number;
    createdAt: Date;
  }): Promise<products> {
    return this.prisma.products.create({
      data,
    });
  }

  async update(id: number, data: Partial<products>): Promise<products> {
    return this.prisma.products.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<products> {
    return this.prisma.products.delete({
      where: { id },
    });
  }
}

export default ProductRepository;
