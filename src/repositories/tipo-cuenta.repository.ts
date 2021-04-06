import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoCuenta, TipoCuentaRelations} from '../models';

export class TipoCuentaRepository extends DefaultCrudRepository<
  TipoCuenta,
  typeof TipoCuenta.prototype.id,
  TipoCuentaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoCuenta, dataSource);
  }
}
