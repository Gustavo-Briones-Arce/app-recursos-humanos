import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Afp, AfpRelations} from '../models';

export class AfpRepository extends DefaultCrudRepository<
  Afp,
  typeof Afp.prototype.id,
  AfpRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Afp, dataSource);
  }
}
