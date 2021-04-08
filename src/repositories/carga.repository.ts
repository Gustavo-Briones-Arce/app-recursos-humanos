import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Carga, CargaRelations, Parentesco} from '../models';
import {ParentescoRepository} from './parentesco.repository';

export class CargaRepository extends DefaultCrudRepository<
  Carga,
  typeof Carga.prototype.id,
  CargaRelations
> {

  public readonly parentesco: BelongsToAccessor<Parentesco, typeof Carga.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParentescoRepository') protected parentescoRepositoryGetter: Getter<ParentescoRepository>,
  ) {
    super(Carga, dataSource);
    this.parentesco = this.createBelongsToAccessorFor('parentesco', parentescoRepositoryGetter,);
    this.registerInclusionResolver('parentesco', this.parentesco.inclusionResolver);
  }
}
