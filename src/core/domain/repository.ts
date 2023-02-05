export default abstract class Repository<T> {
  protected abstract collection: string;

  abstract create(dto: T): Promise<{ id: string, n: number }>;
}
