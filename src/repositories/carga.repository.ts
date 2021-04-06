import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Carga, CargaRelations} from '../models';

export class CargaRepository extends DefaultCrudRepository<
  Carga,
  typeof Carga.prototype.id,
  CargaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Carga, dataSource);
  }
}
