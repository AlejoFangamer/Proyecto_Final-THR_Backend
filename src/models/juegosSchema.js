import z from "zod";

const generosPermitidos = [
  "Aventura",
  "Roguelike",
  "Fiesta",
  "Multijugador",
  "Estrategia",
];

const estadosPermitidos = ["En desarrollo", "Lanzado", "Cancelado"];

export const gameSchema = z.object({
  nombre_juego: z.string().trim().min(1).max(30),
  p_img_juego: z.nullable(z.string().url()),
  b_img_juego: z.nullable(z.string().url()),
  genero_juego: z.array(z.enum(generosPermitidos)),
  estado_juego: z.enum(estadosPermitidos),
  info_juego: z.string().trim().min(1).max(200),
});
