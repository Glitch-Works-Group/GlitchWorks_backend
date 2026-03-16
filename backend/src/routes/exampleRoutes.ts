import { Router } from "express";
import * as exampleService from "../services/exampleService";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const list = await exampleService.listExamples();
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const entity = await exampleService.getExample(req.params.id);
    res.json(entity);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body as { name?: string };
    const entity = await exampleService.createExample({ name: body.name ?? "" });
    res.status(201).json(entity);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await exampleService.deleteExample(req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

export default router;
