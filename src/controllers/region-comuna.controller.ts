import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Region,
  Comuna,
} from '../models';
import {RegionRepository} from '../repositories';

export class RegionComunaController {
  constructor(
    @repository(RegionRepository) protected regionRepository: RegionRepository,
  ) { }

  @get('/regions/{id}/comunas', {
    responses: {
      '200': {
        description: 'Array of Region has many Comuna',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comuna)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comuna>,
  ): Promise<Comuna[]> {
    return this.regionRepository.comunas(id).find(filter);
  }

  @post('/regions/{id}/comunas', {
    responses: {
      '200': {
        description: 'Region model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comuna)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Region.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comuna, {
            title: 'NewComunaInRegion',
            exclude: ['id'],
            optional: ['regionId']
          }),
        },
      },
    }) comuna: Omit<Comuna, 'id'>,
  ): Promise<Comuna> {
    return this.regionRepository.comunas(id).create(comuna);
  }

  @patch('/regions/{id}/comunas', {
    responses: {
      '200': {
        description: 'Region.Comuna PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comuna, {partial: true}),
        },
      },
    })
    comuna: Partial<Comuna>,
    @param.query.object('where', getWhereSchemaFor(Comuna)) where?: Where<Comuna>,
  ): Promise<Count> {
    return this.regionRepository.comunas(id).patch(comuna, where);
  }

  @del('/regions/{id}/comunas', {
    responses: {
      '200': {
        description: 'Region.Comuna DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comuna)) where?: Where<Comuna>,
  ): Promise<Count> {
    return this.regionRepository.comunas(id).delete(where);
  }
}
