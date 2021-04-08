import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Contrato, Gratificacion, Sindicato, Afp, Isapre, Departamento, Banco, TipoCuenta, Carga} from '../models';
import {ContratoRepository} from './contrato.repository';
import {GratificacionRepository} from './gratificacion.repository';
import {SindicatoRepository} from './sindicato.repository';
import {AfpRepository} from './afp.repository';
import {IsapreRepository} from './isapre.repository';
import {DepartamentoRepository} from './departamento.repository';
import {BancoRepository} from './banco.repository';
import {TipoCuentaRepository} from './tipo-cuenta.repository';
import {CargaRepository} from './carga.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly contrato: BelongsToAccessor<Contrato, typeof Empleado.prototype.id>;

  public readonly gratificacion: BelongsToAccessor<Gratificacion, typeof Empleado.prototype.id>;

  public readonly sindicato: BelongsToAccessor<Sindicato, typeof Empleado.prototype.id>;

  public readonly afp: BelongsToAccessor<Afp, typeof Empleado.prototype.id>;

  public readonly isapre: BelongsToAccessor<Isapre, typeof Empleado.prototype.id>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Empleado.prototype.id>;

  public readonly banco: BelongsToAccessor<Banco, typeof Empleado.prototype.id>;

  public readonly tipoCuenta: BelongsToAccessor<TipoCuenta, typeof Empleado.prototype.id>;

  public readonly cargas: HasManyRepositoryFactory<Carga, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ContratoRepository') protected contratoRepositoryGetter: Getter<ContratoRepository>, @repository.getter('GratificacionRepository') protected gratificacionRepositoryGetter: Getter<GratificacionRepository>, @repository.getter('SindicatoRepository') protected sindicatoRepositoryGetter: Getter<SindicatoRepository>, @repository.getter('AfpRepository') protected afpRepositoryGetter: Getter<AfpRepository>, @repository.getter('IsapreRepository') protected isapreRepositoryGetter: Getter<IsapreRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('BancoRepository') protected bancoRepositoryGetter: Getter<BancoRepository>, @repository.getter('TipoCuentaRepository') protected tipoCuentaRepositoryGetter: Getter<TipoCuentaRepository>, @repository.getter('CargaRepository') protected cargaRepositoryGetter: Getter<CargaRepository>,
  ) {
    super(Empleado, dataSource);
    this.cargas = this.createHasManyRepositoryFactoryFor('cargas', cargaRepositoryGetter,);
    this.registerInclusionResolver('cargas', this.cargas.inclusionResolver);
    this.tipoCuenta = this.createBelongsToAccessorFor('tipoCuenta', tipoCuentaRepositoryGetter,);
    this.registerInclusionResolver('tipoCuenta', this.tipoCuenta.inclusionResolver);
    this.banco = this.createBelongsToAccessorFor('banco', bancoRepositoryGetter,);
    this.registerInclusionResolver('banco', this.banco.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.isapre = this.createBelongsToAccessorFor('isapre', isapreRepositoryGetter,);
    this.registerInclusionResolver('isapre', this.isapre.inclusionResolver);
    this.afp = this.createBelongsToAccessorFor('afp', afpRepositoryGetter,);
    this.registerInclusionResolver('afp', this.afp.inclusionResolver);
    this.sindicato = this.createBelongsToAccessorFor('sindicato', sindicatoRepositoryGetter,);
    this.registerInclusionResolver('sindicato', this.sindicato.inclusionResolver);
    this.gratificacion = this.createBelongsToAccessorFor('gratificacion', gratificacionRepositoryGetter,);
    this.registerInclusionResolver('gratificacion', this.gratificacion.inclusionResolver);
    this.contrato = this.createBelongsToAccessorFor('contrato', contratoRepositoryGetter,);
    this.registerInclusionResolver('contrato', this.contrato.inclusionResolver);
  }
}
