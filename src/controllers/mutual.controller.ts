import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Mutual} from '../models';
import {MutualRepository} from '../repositories';

export class MutualController {
  constructor(
    @repository(MutualRepository)
    public mutualRepository : MutualRepository,
  ) {}

  @post('/mutuales')
  @response(200, {
    description: 'Mutual model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mutual)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mutual, {
            title: 'NewMutual',
            exclude: ['id'],
          }),
        },
      },
    })
    mutual: Omit<Mutual, 'id'>,
  ): Promise<Mutual> {
    return this.mutualRepository.create(mutual);
  }

  @get('/mutuales/count')
  @response(200, {
    description: 'Mutual model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mutual) where?: Where<Mutual>,
  ): Promise<Count> {
    return this.mutualRepository.count(where);
  }

  @get('/mutuales')
  @response(200, {
    description: 'Array of Mutual model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mutual, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mutual) filter?: Filter<Mutual>,
  ): Promise<Mutual[]> {
    return this.mutualRepository.find(filter);
  }

  @patch('/mutuales')
  @response(200, {
    description: 'Mutual PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mutual, {partial: true}),
        },
      },
    })
    mutual: Mutual,
    @param.where(Mutual) where?: Where<Mutual>,
  ): Promise<Count> {
    return this.mutualRepository.updateAll(mutual, where);
  }

  @get('/mutuales/{id}')
  @response(200, {
    description: 'Mutual model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mutual, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mutual, {exclude: 'where'}) filter?: FilterExcludingWhere<Mutual>
  ): Promise<Mutual> {
    return this.mutualRepository.findById(id, filter);
  }

  @patch('/mutuales/{id}')
  @response(204, {
    description: 'Mutual PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mutual, {partial: true}),
        },
      },
    })
    mutual: Mutual,
  ): Promise<void> {
    await this.mutualRepository.updateById(id, mutual);
  }

  @put('/mutuales/{id}')
  @response(204, {
    description: 'Mutual PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mutual: Mutual,
  ): Promise<void> {
    await this.mutualRepository.replaceById(id, mutual);
  }

  @del('/mutuales/{id}')
  @response(204, {
    description: 'Mutual DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mutualRepository.deleteById(id);
  }
}
