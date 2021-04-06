import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parentesco, ParentescoRelations} from '../models';

export class ParentescoRepository extends DefaultCrudRepository<
  Parentesco,
  typeof Parentesco.prototype.id,
  ParentescoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Parentesco, dataSource);
  }
}
