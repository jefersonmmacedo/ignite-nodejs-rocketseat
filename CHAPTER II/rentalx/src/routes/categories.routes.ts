import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const categoryAlreadyExists = categoriesRepository.findByNameCategory(name);

  if (categoryAlreadyExists) {
    return res.json({ error: "Category Already Exists" });
  }
  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const allCategories = categoriesRepository.allCategories();

  return res.json(allCategories);
});

export { categoriesRoutes };
