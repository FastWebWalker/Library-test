import { create } from "zustand";
import { BooksApi } from "./api";
import type { Book, BookInput } from "./api";

type BooksState = {
  books: Book[];
  loading: boolean;
  error?: string;
  fetchBooks: () => Promise<void>;
  createBook: (data: BookInput) => Promise<void>;
  updateBook: (id: string, data: Partial<BookInput>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
};

export const useBooksStore = create<BooksState>((set, get) => ({
  books: [],
  loading: false,
  error: undefined,
  async fetchBooks() {
    set({ loading: true, error: undefined });
    try {
      const books = await BooksApi.list();
      set({ books });
    } catch (e) {
      set({ error: "Failed to load books" });
    } finally {
      set({ loading: false });
    }
  },
  async createBook(data) {
    const created = await BooksApi.create(data);
    set({ books: [created, ...get().books] });
  },
  async updateBook(id, data) {
    const updated = await BooksApi.update(id, data);
    set({ books: get().books.map((b) => (b.id === id ? updated : b)) });
  },
  async deleteBook(id) {
    await BooksApi.remove(id);
    set({ books: get().books.filter((b) => b.id !== id) });
  },
}));
