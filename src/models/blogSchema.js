import z from "zod";

export const blogSchema = z.object({
  titulo_blog: z.string().trim().min(1).max(30),
  fecha_blog: z.string().optional(),
  thumb_blog: z.nullable(z.string().url()),
  info_blog: z.string().trim().min(1).max(200),
});
