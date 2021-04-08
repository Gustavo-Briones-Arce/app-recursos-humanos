import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sindicato, SindicatoRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class SindicatoRepository extends DefaultCrudRepository<
  Sindicato,
  typeof Sindicato.prototype.id,
  SindicatoRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Sindicato.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Sindicato, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
