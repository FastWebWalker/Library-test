import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl?: string | null;
  description?: string | null;
  createdAt: string;
}

export type BookInput = Omit<Book, "id" | "createdAt">;

export const BooksApi = {
  list: async (): Promise<Book[]> => (await api.get<Book[]>("/books")).data,
  get: async (id: string): Promise<Book> =>
    (await api.get<Book>(`/books/${id}`)).data,
  create: async (data: BookInput): Promise<Book> =>
    (await api.post<Book>("/books", data)).data,
  update: async (id: string, data: Partial<BookInput>): Promise<Book> =>
    (await api.put<Book>(`/books/${id}`, data)).data,
  remove: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};
