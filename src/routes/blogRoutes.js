import { Router } from "express";
import { blogController } from "../controllers/blogController.js";

export const blogRouter = Router();

blogRouter.get("/", blogController.getAllBlog);
blogRouter.get("/:id", blogController.getBlogId);
blogRouter.post("/", blogController.postBlog);
blogRouter.patch("/:id", blogController.updateBlog);
blogRouter.delete("/:id", blogController.deleteBlog);
