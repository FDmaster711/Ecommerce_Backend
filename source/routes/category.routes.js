import { Router } from "express";
import { CategoryController } from "../controller/category.controller.js";
import { validateCategoryId, validateCategoryData } from "../validators/category.validator.js";

const router = Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getAll);
router.get("/:id", validateCategoryId, categoryController.getById);
router.get("/name/:name", validateCategoryData, categoryController.getByName);
router.post("/", validateCategoryData, categoryController.create);
router.put("/:id", validateCategoryData, validateCategoryId, categoryController.update);
router.delete("/:id", validateCategoryData, validateCategoryId, categoryController.delete);

export default router;