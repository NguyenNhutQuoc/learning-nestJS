import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { BaseService } from 'src/common/base/base-service';

@Injectable()
// T: Service Class
// E: DataSource Class
export class DataLoaderService<T, E> {
  public dataSource: string;
  constructor(public baseService: BaseService<T>) {}

  // Method to create or retrieve a DataLoader instance for a specific data source
  public getLoader(relation: string): DataLoader<string, E> {
    const loader = this.createDataLoader();
    this.dataSource = relation;
    return loader;
  }

  // Method to create a new DataLoader instance
  public createDataLoader(): DataLoader<string, E> {
    return new DataLoader<any, any>((keys) => this.batchLoadFn(keys));
  }

  // Implement your batch loading logic here
  private async batchLoadFn(keys: readonly string[]): Promise<T[]> {
    const data = await this.baseService.findMetaDataByOwnerIds(
      keys,
      this.dataSource,
    );
    const dataToShow = data.map((user: T) => user[this.dataSource]);
    return dataToShow;
  }
}
