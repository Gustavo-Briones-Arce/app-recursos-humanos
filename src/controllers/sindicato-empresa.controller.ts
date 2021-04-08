import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sindicato,
  Empresa,
} from '../models';
import {SindicatoRepository} from '../repositories';

export class SindicatoEmpresaController {
  constructor(
    @repository(SindicatoRepository)
    public sindicatoRepository: SindicatoRepository,
  ) { }

  @get('/sindicatoes/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Sindicato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Sindicato.prototype.id,
  ): Promise<Empresa> {
    return this.sindicatoRepository.empresa(id);
  }
}
