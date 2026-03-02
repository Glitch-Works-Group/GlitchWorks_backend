import type { ExampleEntity, CreateExampleInput } from "../models/example";

/**
 * Data access layer.
 * All DB / external storage calls go here.
 * Keeps services free of storage details.
 */
const store = new Map<string, ExampleEntity>();

export async function findById(id: string): Promise<ExampleEntity | null> {
  return store.get(id) ?? null;
}

export async function findAll(): Promise<ExampleEntity[]> {
  return Array.from(store.values());
}

export async function create(input: CreateExampleInput): Promise<ExampleEntity> {
  const id = crypto.randomUUID();
  const entity: ExampleEntity = {
    id,
    name: input.name,
    createdAt: new Date(),
  };
  store.set(id, entity);
  return entity;
}

export async function remove(id: string): Promise<boolean> {
  return store.delete(id);
}
