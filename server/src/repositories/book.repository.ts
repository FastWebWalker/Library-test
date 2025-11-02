import prisma from "../config/prisma.js";

export class BookRepository {
  async findAll() {
    return prisma.book.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: string) {
    return prisma.book.findUnique({ where: { id } });
  }

  async create(data: {
    title: string;
    author: string;
    imageUrl?: string | null;
    description?: string | null;
  }) {
    return prisma.book.create({ data });
  }

  async update(id: string, data: Partial<{
    title: string;
    author: string;
    imageUrl?: string | null;
    description?: string | null;
  }>) {
    return prisma.book.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.book.delete({ where: { id } });
  }
}

export const bookRepository = new BookRepository();

