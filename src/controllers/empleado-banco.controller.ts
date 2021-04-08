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
  Banco,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoBancoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/banco', {
    responses: {
      '200': {
        description: 'Banco belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Banco)},
          },
        },
      },
    },
  })
  async getBanco(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Banco> {
    return this.empleadoRepository.banco(id);
  }
}
