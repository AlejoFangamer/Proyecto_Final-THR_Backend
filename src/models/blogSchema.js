import z from "zod";

export const blogSchema = z.object({
  autor_blog: z.string().trim().min(1).max(80).default("Anonimo"),
  titulo_blog: z.string().trim().min(1).max(100),
  fecha_blog: z.string().optional(),
  thumb_blog: z.nullable(z.string().url()).default(null),
  info_blog: z.string().trim().min(1).max(200),
});
