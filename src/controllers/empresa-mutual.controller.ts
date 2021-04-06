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
  Mutual,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaMutualController {
  constructor(
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/mutual', {
    responses: {
      '200': {
        description: 'Mutual belonging to Empresa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mutual)},
          },
        },
      },
    },
  })
  async getMutual(
    @param.path.string('id') id: typeof Empresa.prototype.id,
  ): Promise<Mutual> {
    return this.empresaRepository.mutual(id);
  }
}
