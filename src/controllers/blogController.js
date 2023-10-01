import { pool } from "../db.js";
import {
  validateSchema,
  validatePartialSchema,
} from "../utils/zodValidationTypes.js";

import { blogSchema } from "../models/blogSchema.js";

export const blogController = {
  getAllBlog: async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM blog");
      res.status(200).json(result.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  getBlogId: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query("SELECT * FROM blog WHERE id_blog = $1", [
        id,
      ]);

      if (result.rows.length <= 0) {
        return res.status(404).json({ error: "No se encontró el elemento" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  postBlog: async (req, res) => {
    const validated = validateSchema(blogSchema, req.body);

    if (validated.error) {
      return res
        .status(422)
        .json({ error: JSON.parse(validated.error.message) });
    }

    try {
      const query = `INSERT INTO blog (${Object.keys(
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
  updateBlog: async (req, res) => {
    const id = req.params.id;
    const dataUpdate = validatePartialSchema(blogSchema, req.body);

    if (dataUpdate.error) {
      return res
        .status(422)
        .json({ error: JSON.parse(dataUpdate.error.message) });
    }

    try {
      const query = `UPDATE blog SET ${Object.keys(dataUpdate.data)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ")} WHERE id_blog = $1 RETURNING *`;

      const values = [id, ...Object.values(dataUpdate.data)];

      const result = await pool.query(query, values);

      res.status(202).json(result.rows[0]);
    } catch (err) {}
  },
  deleteBlog: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      await pool.query("DELETE FROM blog WHERE id_blog = $1", [id]);

      res.status(202).json(`Miembro con el ID: ${id} fue borrado exitosamente`);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
