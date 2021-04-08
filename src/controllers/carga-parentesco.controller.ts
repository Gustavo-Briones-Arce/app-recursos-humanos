import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Carga,
  Parentesco,
} from '../models';
import {CargaRepository} from '../repositories';

export class CargaParentescoController {
  constructor(
    @repository(CargaRepository)
    public cargaRepository: CargaRepository,
  ) { }

  @get('/cargas/{id}/parentesco', {
    responses: {
      '200': {
        description: 'Parentesco belonging to Carga',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parentesco)},
          },
        },
      },
    },
  })
  async getParentesco(
    @param.path.string('id') id: typeof Carga.prototype.id,
  ): Promise<Parentesco> {
    return this.cargaRepository.parentesco(id);
  }
}
