import { Router } from "express";
import { juegosController } from "../controllers/juegosController.js";

export const gameRouter = Router();

gameRouter.get("/", juegosController.getAllGame);
gameRouter.get("/:id", juegosController.getGameId);
gameRouter.post("/", juegosController.postGame);
gameRouter.patch("/:id", juegosController.updateGame);
gameRouter.delete("/:id", juegosController.deleteGame);
