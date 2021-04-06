import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Isapre, IsapreRelations} from '../models';

export class IsapreRepository extends DefaultCrudRepository<
  Isapre,
  typeof Isapre.prototype.id,
  IsapreRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Isapre, dataSource);
  }
}
