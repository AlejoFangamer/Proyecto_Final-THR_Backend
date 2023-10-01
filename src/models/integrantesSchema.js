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
  nombre_mem: z.string().trim().min(1).max(30).default('Anonimo'),
  img_mem: z.string().url()
    .default(
      "https://github.com/AlejoFangamer/Proyecto_Final-THR_Backend/blob/main/src/placeholders/Profile.png?raw=true"
    ),
  pais_mem: z.string().trim().min(1).max(30).default('Mi Casa'),
  role_mem: z.array(z.enum(rolesPermitidos)).default(['Tester']),
  info_mem: z.string().trim().min(1).max(100).default('No hago nada xd'),
});

