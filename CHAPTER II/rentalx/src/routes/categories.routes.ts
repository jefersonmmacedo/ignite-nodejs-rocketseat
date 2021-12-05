import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../Modules/cars/useCases/createCategory";
import { importCategoryController } from "../Modules/cars/useCases/ImportCategory";
import { listCategoriesController } from "../Modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) => {
  console.log('Run Reload 2');
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
