import { pool } from "../db.js";
import { z } from "zod";
import { validateMem } from "../models/integrantesSchema.js";

const table_name = "integrantes";

export const memController = {
  getAllMem: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM integrantes");
      res.status(200).json(result.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  getMemId: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query(
        "SELECT * FROM integrantes WHERE id_mem = $1",
        [id]
      );

      if (result.rows.length <= 0) {
        return res.status(404).json({ error: "No se encontró el elemento" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  postMem: async (req, res) => {
    try {
      const validated = validateMem(req.body);
      if (validated.error) {
        return res
          .status(422)
          .json({ error: JSON.parse(validated.error.message) });
      }
      const query =
        "INSERT INTO integrantes (nombre_mem , pais_mem , role_mem , info_mem) VALUES ($1 , $2 , $3 , $4) RETURNING *";
      const { nombre_mem, pais_mem, role_mem, info_mem } = validated.data;
      const values = [nombre_mem, pais_mem, role_mem, info_mem];

      const result = await pool.query(query, values);

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateMem: async (req, res) => {
    try {
      const id = req.params.id;
      const dataUpdate = validateMem(req.body);

      if (dataUpdate.error) {
        return res
          .status(422)
          .json({ error: JSON.parse(dataUpdate.error.message) });
      }

      const query = `UPDATE integrantes SET ${Object.keys(dataUpdate)
        .map((key) => `${key} = $${key}`)
        .join(", ")} WHERE id = $2`;
        
      const values = [id, ...Object.values(dataUpdate)];

      const result = await pool.query(query, values);

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
