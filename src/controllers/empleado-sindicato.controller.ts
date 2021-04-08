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
  Sindicato,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoSindicatoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/sindicato', {
    responses: {
      '200': {
        description: 'Sindicato belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sindicato)},
          },
        },
      },
    },
  })
  async getSindicato(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Sindicato> {
    return this.empleadoRepository.sindicato(id);
  }
}
