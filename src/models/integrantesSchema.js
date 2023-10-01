import z from "zod";

const rolesPermitidos = [
  "Programador",
  "Artista",
  "Diseñador",
  "Musico",
  "Escritor",
  "Tester"
];

export const memSchema = z.object({
  nombre_mem: z.string().trim().min(1).max(30),
  img_mem: z.nullable(z.string().url()),
  pais_mem: z.string().trim().min(1).max(30),
  role_mem: z.array(z.enum(rolesPermitidos)),
  info_mem: z.string().trim().min(1).max(100),
});

