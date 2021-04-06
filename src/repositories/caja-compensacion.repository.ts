import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CajaCompensacion, CajaCompensacionRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class CajaCompensacionRepository extends DefaultCrudRepository<
  CajaCompensacion,
  typeof CajaCompensacion.prototype.id,
  CajaCompensacionRelations
> {

  public readonly empresas: HasManyRepositoryFactory<Empresa, typeof CajaCompensacion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(CajaCompensacion, dataSource);
    this.empresas = this.createHasManyRepositoryFactoryFor('empresas', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresas', this.empresas.inclusionResolver);
  }
}
