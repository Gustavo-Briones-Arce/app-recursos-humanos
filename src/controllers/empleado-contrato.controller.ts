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
  Contrato,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoContratoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/contrato', {
    responses: {
      '200': {
        description: 'Contrato belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contrato)},
          },
        },
      },
    },
  })
  async getContrato(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Contrato> {
    return this.empleadoRepository.contrato(id);
  }
}
