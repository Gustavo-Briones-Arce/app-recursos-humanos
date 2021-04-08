import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Gratificacion,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoGratificacionController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/gratificacion', {
    responses: {
      '200': {
        description: 'Gratificacion belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gratificacion)},
          },
        },
      },
    },
  })
  async getGratificacion(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Gratificacion> {
    return this.empleadoRepository.gratificacion(id);
  }
}
