import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.id,
  SucursalRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Sucursal.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Sucursal, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
