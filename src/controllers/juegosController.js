import { pool } from "../db.js";
import {
  validateSchema,
  validatePartialSchema,
} from "../utils/zodValidationTypes.js";

import { gameSchema } from "../models/juegosSchema.js";

export const juegosController = {
  getAllGame: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM juegos");
      res.status(200).json(result.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  getGameId: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query(
        "SELECT * FROM juegos WHERE id_juego = $1",
        [id]
      );

      if (result.rows.length <= 0) {
        return res.status(404).json({ error: "No se encontró el elemento" });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  postGame: async (req, res) => {
    const validated = validateSchema(gameSchema, req.body);

    if (validated.error) {
      return res
        .status(422)
        .json({ error: JSON.parse(validated.error.message) });
    }
    try {
      const query = `INSERT INTO juegos (${Object.keys(
        validated.data
      ).join(", ")}) VALUES (${Object.keys(validated.data)
        .map((keys, index) => `$${index + 1}`)
        .join(", ")}) RETURNING *`;

      const result = await pool.query(query, Object.values(validated.data));

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateGame: async (req, res) => {
    const id = req.params.id;
    const dataUpdate = validatePartialSchema(gameSchema, req.body);

    if (dataUpdate.error) {
      return res
        .status(422)
        .json({ error: JSON.parse(dataUpdate.error.message) });
    }

    try {
      const query = `UPDATE juegos SET ${Object.keys(dataUpdate.data)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ")} WHERE id_juego = $1 RETURNING *`;

      const values = [id, ...Object.values(dataUpdate.data)];

      const result = await pool.query(query, values);

      res.status(202).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  deleteGame: async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
      await pool.query("DELETE FROM juegos WHERE id_juego = $1", [id]);

      res.status(205).json(`Juego con el ID: ${id} fue borrado exitosamente`);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
