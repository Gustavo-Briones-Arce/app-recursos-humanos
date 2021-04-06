import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sindicato, SindicatoRelations} from '../models';

export class SindicatoRepository extends DefaultCrudRepository<
  Sindicato,
  typeof Sindicato.prototype.id,
  SindicatoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Sindicato, dataSource);
  }
}
