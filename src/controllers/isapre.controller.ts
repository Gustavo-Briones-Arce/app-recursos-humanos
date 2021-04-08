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
import {Isapre} from '../models';
import {IsapreRepository} from '../repositories';

export class IsapreController {
  constructor(
    @repository(IsapreRepository)
    public isapreRepository : IsapreRepository,
  ) {}

  @post('/isapres')
  @response(200, {
    description: 'Isapre model instance',
    content: {'application/json': {schema: getModelSchemaRef(Isapre)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Isapre, {
            title: 'NewIsapre',
            exclude: ['id'],
          }),
        },
      },
    })
    isapre: Omit<Isapre, 'id'>,
  ): Promise<Isapre> {
    return this.isapreRepository.create(isapre);
  }

  @get('/isapres/count')
  @response(200, {
    description: 'Isapre model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Isapre) where?: Where<Isapre>,
  ): Promise<Count> {
    return this.isapreRepository.count(where);
  }

  @get('/isapres')
  @response(200, {
    description: 'Array of Isapre model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Isapre, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Isapre) filter?: Filter<Isapre>,
  ): Promise<Isapre[]> {
    return this.isapreRepository.find(filter);
  }

  @patch('/isapres')
  @response(200, {
    description: 'Isapre PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Isapre, {partial: true}),
        },
      },
    })
    isapre: Isapre,
    @param.where(Isapre) where?: Where<Isapre>,
  ): Promise<Count> {
    return this.isapreRepository.updateAll(isapre, where);
  }

  @get('/isapres/{id}')
  @response(200, {
    description: 'Isapre model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Isapre, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Isapre, {exclude: 'where'}) filter?: FilterExcludingWhere<Isapre>
  ): Promise<Isapre> {
    return this.isapreRepository.findById(id, filter);
  }

  @patch('/isapres/{id}')
  @response(204, {
    description: 'Isapre PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Isapre, {partial: true}),
        },
      },
    })
    isapre: Isapre,
  ): Promise<void> {
    await this.isapreRepository.updateById(id, isapre);
  }

  @put('/isapres/{id}')
  @response(204, {
    description: 'Isapre PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() isapre: Isapre,
  ): Promise<void> {
    await this.isapreRepository.replaceById(id, isapre);
  }

  @del('/isapres/{id}')
  @response(204, {
    description: 'Isapre DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.isapreRepository.deleteById(id);
  }
}
