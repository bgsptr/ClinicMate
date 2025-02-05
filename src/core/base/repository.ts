export abstract class Repository<TEntity> {
    abstract create(data: TEntity): Promise<void>;
    abstract updateById?(id: number | string, data: TEntity): Promise<void>;
    abstract deleteById?(id: number | string): Promise<void>;
}