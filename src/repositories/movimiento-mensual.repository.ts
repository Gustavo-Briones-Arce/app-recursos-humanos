import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MovimientoMensual, MovimientoMensualRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class MovimientoMensualRepository extends DefaultCrudRepository<
  MovimientoMensual,
  typeof MovimientoMensual.prototype.id,
  MovimientoMensualRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof MovimientoMensual.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(MovimientoMensual, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
