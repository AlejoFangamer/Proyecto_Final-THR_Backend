import z from "zod";

const rolesPermitidos = [
  "Programador",
  "Artista",
  "Diseñador",
  "Musico",
  "Escritor",
  "Tester"
];

const memSchema = z.object({
  nombre_mem: z.string().trim().min(1).max(30),
  pais_mem: z.string().trim().min(1).max(30),
  role_mem: z.array(z.enum(rolesPermitidos)),
  info_mem: z.string().trim().min(1).max(100),
});

export function validateMem(input) {
  return memSchema.safeParse(input);
}