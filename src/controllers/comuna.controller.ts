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
import {Comuna} from '../models';
import {ComunaRepository} from '../repositories';

export class ComunaController {
  constructor(
    @repository(ComunaRepository)
    public comunaRepository : ComunaRepository,
  ) {}

  @post('/comunas')
  @response(200, {
    description: 'Comuna model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comuna)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comuna, {
            title: 'NewComuna',
            exclude: ['id'],
          }),
        },
      },
    })
    comuna: Omit<Comuna, 'id'>,
  ): Promise<Comuna> {
    return this.comunaRepository.create(comuna);
  }

  @get('/comunas/count')
  @response(200, {
    description: 'Comuna model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comuna) where?: Where<Comuna>,
  ): Promise<Count> {
    return this.comunaRepository.count(where);
  }

  @get('/comunas')
  @response(200, {
    description: 'Array of Comuna model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comuna, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comuna) filter?: Filter<Comuna>,
  ): Promise<Comuna[]> {
    return this.comunaRepository.find(filter);
  }

  @patch('/comunas')
  @response(200, {
    description: 'Comuna PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comuna, {partial: true}),
        },
      },
    })
    comuna: Comuna,
    @param.where(Comuna) where?: Where<Comuna>,
  ): Promise<Count> {
    return this.comunaRepository.updateAll(comuna, where);
  }

  @get('/comunas/{id}')
  @response(200, {
    description: 'Comuna model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comuna, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Comuna, {exclude: 'where'}) filter?: FilterExcludingWhere<Comuna>
  ): Promise<Comuna> {
    return this.comunaRepository.findById(id, filter);
  }

  @patch('/comunas/{id}')
  @response(204, {
    description: 'Comuna PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comuna, {partial: true}),
        },
      },
    })
    comuna: Comuna,
  ): Promise<void> {
    await this.comunaRepository.updateById(id, comuna);
  }

  @put('/comunas/{id}')
  @response(204, {
    description: 'Comuna PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comuna: Comuna,
  ): Promise<void> {
    await this.comunaRepository.replaceById(id, comuna);
  }

  @del('/comunas/{id}')
  @response(204, {
    description: 'Comuna DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comunaRepository.deleteById(id);
  }
}
