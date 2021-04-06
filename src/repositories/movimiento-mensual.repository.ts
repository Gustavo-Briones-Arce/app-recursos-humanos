import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MovimientoMensual, MovimientoMensualRelations} from '../models';

export class MovimientoMensualRepository extends DefaultCrudRepository<
  MovimientoMensual,
  typeof MovimientoMensual.prototype.id,
  MovimientoMensualRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(MovimientoMensual, dataSource);
  }
}
