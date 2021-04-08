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
  Isapre,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoIsapreController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/isapre', {
    responses: {
      '200': {
        description: 'Isapre belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Isapre)},
          },
        },
      },
    },
  })
  async getIsapre(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Isapre> {
    return this.empleadoRepository.isapre(id);
  }
}
