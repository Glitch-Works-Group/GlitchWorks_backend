import { AppError } from "../middleware/errorHandler";
import type { ExampleEntity, CreateExampleInput } from "../models/example";
import * as exampleRepo from "../repositories/exampleRepository";

/**
 * Business logic layer.
 * Orchestrates repositories and enforces rules.
 */
export async function getExample(id: string): Promise<ExampleEntity> {
  const entity = await exampleRepo.findById(id);
  if (!entity) {
    throw new AppError(404, "Example not found", "NOT_FOUND");
  }
  return entity;
}

export async function listExamples(): Promise<ExampleEntity[]> {
  return exampleRepo.findAll();
}

export async function createExample(
  input: CreateExampleInput
): Promise<ExampleEntity> {
  if (!input.name?.trim()) {
    throw new AppError(400, "Name is required", "VALIDATION_ERROR");
  }
  return exampleRepo.create({ name: input.name.trim() });
}

export async function deleteExample(id: string): Promise<void> {
  const deleted = await exampleRepo.remove(id);
  if (!deleted) {
    throw new AppError(404, "Example not found", "NOT_FOUND");
  }
}
