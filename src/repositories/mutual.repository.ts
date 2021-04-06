import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mutual, MutualRelations} from '../models';

export class MutualRepository extends DefaultCrudRepository<
  Mutual,
  typeof Mutual.prototype.id,
  MutualRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Mutual, dataSource);
  }
}
