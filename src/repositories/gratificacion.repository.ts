import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Gratificacion, GratificacionRelations} from '../models';

export class GratificacionRepository extends DefaultCrudRepository<
  Gratificacion,
  typeof Gratificacion.prototype.id,
  GratificacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Gratificacion, dataSource);
  }
}
