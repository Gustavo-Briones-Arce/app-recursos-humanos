import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, CajaCompensacion, Mutual, Departamento} from '../models';
import {CajaCompensacionRepository} from './caja-compensacion.repository';
import {MutualRepository} from './mutual.repository';
import {DepartamentoRepository} from './departamento.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly cajaCompensacion: BelongsToAccessor<CajaCompensacion, typeof Empresa.prototype.id>;

  public readonly mutual: BelongsToAccessor<Mutual, typeof Empresa.prototype.id>;

  public readonly departamentos: HasManyRepositoryFactory<Departamento, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CajaCompensacionRepository') protected cajaCompensacionRepositoryGetter: Getter<CajaCompensacionRepository>, @repository.getter('MutualRepository') protected mutualRepositoryGetter: Getter<MutualRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Empresa, dataSource);
    this.departamentos = this.createHasManyRepositoryFactoryFor('departamentos', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
    this.mutual = this.createBelongsToAccessorFor('mutual', mutualRepositoryGetter,);
    this.registerInclusionResolver('mutual', this.mutual.inclusionResolver);
    this.cajaCompensacion = this.createBelongsToAccessorFor('cajaCompensacion', cajaCompensacionRepositoryGetter,);
    this.registerInclusionResolver('cajaCompensacion', this.cajaCompensacion.inclusionResolver);
  }
}
