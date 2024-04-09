import {
  Entity,
  FindOneOptions,
  FindOptionsWhere,
  getMetadataArgsStorage,
  ObjectId,
  Repository,
} from 'typeorm';

export class BaseRepository<T extends typeof Entity> {
  constructor(protected readonly repository: Repository<T>) {
    this.repository = repository.extend({
      findByIds(ids: any[]): Promise<T[]> {
        return this.repository.findByIds(ids, {
          relations: this.showRelations(),
        });
      },
      findOne(options: FindOneOptions<T>): Promise<T | null> {
        return this.repository.findOne(options, {
          relations: this.showRelations(),
        });
      },
      findOneBy(
        where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
      ): Promise<T | null> {
        return this.repository.findOne(where, {
          relations: this.showRelations(),
        });
      },
      findOneById(id: number | string | Date | ObjectId): Promise<T | null> {
        return this.repository.findOne(id, {
          relations: this.showRelations(),
        });
      },
    });
  }

  // Find all entities
  findAll(): Promise<T[]> {
    return this.repository.find({
      relations: this.showRelations(),
    });
  }

  // Find first entity that matches given any conditions
  findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this.repository.findOne({
      where,
      relations: this.showRelations(),
    });
  }

  // Custom method repository find by id

  private showRelations(): string[] {
    return getMetadataArgsStorage().relations.map((r) => r.propertyName);
  }
}
