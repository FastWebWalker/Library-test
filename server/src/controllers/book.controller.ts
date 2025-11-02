import { Request, Response, NextFunction } from "express";
import { bookService } from "../services/book.service.js";
import {
  bookCreateSchema,
  bookUpdateSchema,
} from "../schemas/book.schema.js";
import { z } from "zod";

export const listBooks = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await bookService.list();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await bookService.get(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = bookCreateSchema.parse(req.body);
    const created = await bookService.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = bookUpdateSchema.parse(req.body);
    const updated = await bookService.update(req.params.id, data);
    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) return next(err);
    // Prisma will throw if not found; translate to 404
    if (
      typeof err === "object" &&
      err !== null &&
      (err as any).code === "P2025"
    ) {
      return res.status(404).json({ message: "Not found" });
    }
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await bookService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    // translate Prisma not found to 404
    if (
      typeof err === "object" &&
      err !== null &&
      (err as any).code === "P2025"
    ) {
      return res.status(404).json({ message: "Not found" });
    }
    next(err);
  }
};

