import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mutual, MutualRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class MutualRepository extends DefaultCrudRepository<
  Mutual,
  typeof Mutual.prototype.id,
  MutualRelations
> {

  public readonly empresas: HasManyRepositoryFactory<Empresa, typeof Mutual.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Mutual, dataSource);
    this.empresas = this.createHasManyRepositoryFactoryFor('empresas', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresas', this.empresas.inclusionResolver);
  }
}
