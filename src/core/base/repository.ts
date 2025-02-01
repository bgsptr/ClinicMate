export abstract class Repository<TEntity> {
    abstract create(data: TEntity): Promise<void>;
    abstract updateById?(id: number, data: TEntity): Promise<void>;
    abstract deleteById?(id: number): Promise<void>;
}