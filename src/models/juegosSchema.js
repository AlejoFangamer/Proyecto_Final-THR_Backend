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
  nombre_juego: z.string().trim().min(1).max(30).default("No hay juego"),
  p_img_juego: z
    .nullable(z.string().url())
    .default(
      "https://github.com/AlejoFangamer/Proyecto_Final-THR_Backend/blob/main/src/placeholders/Profile.png?raw=true"
    ),
  b_img_juego: z
    .nullable(z.string().url())
    .default(
      "https://github.com/AlejoFangamer/Proyecto_Final-THR_Backend/blob/main/src/placeholders/Background.png?raw=true"
    ),
  genero_juego: z.array(z.enum(generosPermitidos)),
  estado_juego: z.enum(estadosPermitidos).default('En desarrollo'),
  info_juego: z.string().trim().min(1).max(200),
});
