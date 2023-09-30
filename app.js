import express from "express";
import cors from "cors";
import "dotenv/config";
import { memRouter } from "./src/routes/integrantesRoutes.js";

const app = express();
const port = process.env.PORT ?? 8008;

app.use(express.json());
app.use(cors());

app.use("/integrantes", memRouter);
// app.use("/juegos", tasksRouter);
// app.use("/blog", tasksRouter);

app.use((req,res) => {
  res.status(404).json({error:"Pagina no encontrada"});
})

app.listen(port, () => {
  console.log(`Servidor Escuchando en el puerto: http://localhost:${port}`);
});
