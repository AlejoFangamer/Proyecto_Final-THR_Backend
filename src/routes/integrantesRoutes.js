import { Router } from "express";
import { memController } from "../controllers/integrantesController.js";

export const memRouter = Router();

memRouter.get("/",memController.getAllMem);
memRouter.get("/:id",memController.getMemId);
memRouter.post("/",memController.postMem);
memRouter.patch("/:id",memController.updateMem);
// memRouter.delete("/:id",memController.deleteMem);
