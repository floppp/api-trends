import { Id } from "./model";

export default abstract class Repository<T> {
  protected abstract collection: string;

  abstract findAll(): Promise<T[]>;
  // Limited, it should be wider than only string|number.
  abstract findOne(criteria: Record<string, string | number>): Promise<T>;
  abstract create(dto: Partial<T>): Promise<Id>;
}
