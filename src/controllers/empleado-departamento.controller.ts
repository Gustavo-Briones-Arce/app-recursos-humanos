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
  Departamento,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoDepartamentoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Departamento> {
    return this.empleadoRepository.departamento(id);
  }
}
