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
  TipoCuenta,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoTipoCuentaController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/tipo-cuenta', {
    responses: {
      '200': {
        description: 'TipoCuenta belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoCuenta)},
          },
        },
      },
    },
  })
  async getTipoCuenta(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<TipoCuenta> {
    return this.empleadoRepository.tipoCuenta(id);
  }
}
