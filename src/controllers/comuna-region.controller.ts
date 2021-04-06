import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comuna,
  Region,
} from '../models';
import {ComunaRepository} from '../repositories';

export class ComunaRegionController {
  constructor(
    @repository(ComunaRepository)
    public comunaRepository: ComunaRepository,
  ) { }

  @get('/comunas/{id}/region', {
    responses: {
      '200': {
        description: 'Region belonging to Comuna',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Region)},
          },
        },
      },
    },
  })
  async getRegion(
    @param.path.string('id') id: typeof Comuna.prototype.id,
  ): Promise<Region> {
    return this.comunaRepository.region(id);
  }
}
