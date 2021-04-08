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
  Afp,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoAfpController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/afp', {
    responses: {
      '200': {
        description: 'Afp belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Afp)},
          },
        },
      },
    },
  })
  async getAfp(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Afp> {
    return this.empleadoRepository.afp(id);
  }
}
