import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CajaCompensacion, CajaCompensacionRelations} from '../models';

export class CajaCompensacionRepository extends DefaultCrudRepository<
  CajaCompensacion,
  typeof CajaCompensacion.prototype.id,
  CajaCompensacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CajaCompensacion, dataSource);
  }
}
