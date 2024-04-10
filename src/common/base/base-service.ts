import {
  FindOptionsWhere,
  getMetadataArgsStorage,
  In,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ListResult } from './list-result';

export class BaseService<T> {
  protected showRelations: Set<string>;

  constructor(protected readonly repository: Repository<T>) {
    const { relations } = getMetadataArgsStorage();
    this.showRelations = new Set(
      relations
        .filter((relation) => relation.target === repository?.target)
        .map((relation) => relation.propertyName),
    );

    console.log(this.showRelations);
  }

  // Find all entities
  findAll(): Promise<T[]> {
    const query = this.createQueryBuilder({});

    return query.getMany();
  }

  // Find entity that matches given any conditions
  async findBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | undefined> {
    const queryBuilder = this.createQueryBuilder(where);

    return queryBuilder.getOne();
  }

  // Find all entities that match given any conditions
  async findAllBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order?: string,
    index?: number,
    skip?: number,
    take?: number,
  ): Promise<ListResult<T>> {
    let orderBy = {};
    if (order) {
      orderBy = this.handleSort(order);
    }
    console.log(orderBy);
    const queryBuilder = this.createQueryBuilder(where, orderBy, skip, take);

    return this.mapToListResult(
      await queryBuilder.getMany(),
      await queryBuilder.getCount(),
      take || 10,
      index || 1,
      order || '+id',
    );
  }

  private createQueryBuilder(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order?: { [P in keyof T]?: 'ASC' | 'DESC' },
    skip?: number,
    take?: number,
  ): SelectQueryBuilder<T> {
    const alias = this.repository.metadata.name;
    const queryBuilder = this.repository.createQueryBuilder(alias);

    if (order) {
      Object.keys(order).forEach((key) => {
        queryBuilder.addOrderBy(`${alias}.${key}`, order[key]);
      });
    }

    if (skip) {
      queryBuilder.skip(skip);
    }

    if (take) {
      queryBuilder.take(take);
    }
    if (Array.isArray(where)) {
      where.forEach((condition, index) => {
        const alias = `condition_${index}`;
        queryBuilder.andWhere(`${alias}`, condition);
      });
    } else {
      queryBuilder.where(where);
    }

    this.showRelations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relation);
    });

    return queryBuilder;
  }

  private handleSort(orderBy: string) {
    const order: { [P in keyof T]?: 'ASC' | 'DESC' } = {};
    const orderBys = orderBy.split(',');
    if (orderBys.length === 0) {
      return {};
    }

    orderBys.forEach((orderBy) => {
      const key = orderBy.slice(1);
      order[key] = orderBy.startsWith('-') ? 'DESC' : 'ASC';
    });

    return order;
  }

  // Map to ListResult
  async mapToListResult(
    data: T[],
    totalCount: number,
    pageSize: number,
    pageNumber: number,
    orderBy: string,
  ): Promise<ListResult<T>> {
    const result = new ListResult<T>();
    result.data = data;
    result.totalCount = totalCount;
    result.pageSize = pageSize;
    result.pageNumber = pageNumber;
    result.orderBy = orderBy;

    return result;
  }

  findOneNotUseCreateBuilder(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ) {
    return this.repository.find({
      where,
    });
  }

  async findMetaDataByOwnerIds(ids: readonly string[], relations: string) {
    const where = {} as FindOptionsWhere<T>;
    const idKey = this.repository.metadata.primaryColumns[0].propertyName;
    where[idKey] = In(ids);
    if (relations) {
      if (this.showRelations.has(relations)) {
        return await this.repository.find({
          where,
          relations: [relations],
        });
      }
    } else {
      return await this.repository.find({
        where,
      });
    }
  }
}
