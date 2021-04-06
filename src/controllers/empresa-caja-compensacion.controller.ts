import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empresa,
  CajaCompensacion,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaCajaCompensacionController {
  constructor(
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/caja-compensacion', {
    responses: {
      '200': {
        description: 'CajaCompensacion belonging to Empresa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CajaCompensacion)},
          },
        },
      },
    },
  })
  async getCajaCompensacion(
    @param.path.string('id') id: typeof Empresa.prototype.id,
  ): Promise<CajaCompensacion> {
    return this.empresaRepository.cajaCompensacion(id);
  }
}
