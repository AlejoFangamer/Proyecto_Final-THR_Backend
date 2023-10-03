import { pool } from "../db.js";
import {
  validateSchema,
  validatePartialSchema,
} from "../utils/zodValidationTypes.js";

import { memSchema } from "../models/integrantesSchema.js";

export const memController = {
  getAllMem: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM integrantes");

      if (result.rows.length == 1) {
        return res.status(200).json(result.rows[0]);
      }else if (result.rows.length <= 0) {
        return res.status(404).json({ error: "No hay elementos" });
      }
      
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
    const validated = validateSchema(memSchema, req.body);

    if (validated.error) {
      return res
        .status(422)
        .json({ error: JSON.parse(validated.error.message) });
    }

    try {
      const query = `INSERT INTO integrantes (${Object.keys(
        validated.data
      ).join(", ")}) VALUES (${Object.keys(validated.data)
        .map((keys, index) => `$${index + 1}`)
        .join(", ")}) RETURNING *`;

      const result = await pool.query(query, Object.values(validated.data));

      res.status(201).json(result.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateMem: async (req, res) => {
    const id = req.params.id;
    const dataUpdate = validatePartialSchema(memSchema, req.body);

    if (dataUpdate.error) {
      return res
        .status(422)
        .json({ error: JSON.parse(dataUpdate.error.message) });
    }

    try {
      const query = `UPDATE integrantes SET ${Object.keys(dataUpdate.data)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ")} WHERE id_mem = $1 RETURNING *`;

      const values = [id, ...Object.values(dataUpdate.data)];

      // console.log("Query:", query);
      // console.log("Values:", values);

      const result = await pool.query(query, values);

      res.status(202).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  deleteMem: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      await pool.query("DELETE FROM integrantes WHERE id_mem = $1", [id]);

      res.status(202).json(`Miembro con el ID: ${id} fue borrado exitosamente`);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
