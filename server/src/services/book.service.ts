import { bookRepository } from "../repositories/book.repository.js";

export class BookService {
  list() {
    return bookRepository.findAll();
  }

  async get(id: string) {
    const book = await bookRepository.findById(id);
    return book;
  }

  create(data: {
    title: string;
    author: string;
    imageUrl?: string | null;
    description?: string | null;
  }) {
    return bookRepository.create(data);
  }

  update(id: string, data: Partial<{
    title: string;
    author: string;
    imageUrl?: string | null;
    description?: string | null;
  }>) {
    return bookRepository.update(id, data);
  }

  delete(id: string) {
    return bookRepository.delete(id);
  }
}

export const bookService = new BookService();

