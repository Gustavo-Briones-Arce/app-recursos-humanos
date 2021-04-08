import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MovimientoMensual,
  Empleado,
} from '../models';
import {MovimientoMensualRepository} from '../repositories';

export class MovimientoMensualEmpleadoController {
  constructor(
    @repository(MovimientoMensualRepository)
    public movimientoMensualRepository: MovimientoMensualRepository,
  ) { }

  @get('/movimiento-mensuals/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to MovimientoMensual',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof MovimientoMensual.prototype.id,
  ): Promise<Empleado> {
    return this.movimientoMensualRepository.empleado(id);
  }
}
