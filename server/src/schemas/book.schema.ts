import { z } from "zod";

export const bookCreateSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
  description: z.string().optional().default(""),
});

export const bookUpdateSchema = bookCreateSchema.partial();

export type BookCreateInput = z.infer<typeof bookCreateSchema>;
export type BookUpdateInput = z.infer<typeof bookUpdateSchema>;

