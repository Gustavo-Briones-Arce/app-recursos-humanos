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
import {Parentesco} from '../models';
import {ParentescoRepository} from '../repositories';

export class ParentescoController {
  constructor(
    @repository(ParentescoRepository)
    public parentescoRepository : ParentescoRepository,
  ) {}

  @post('/parentescos')
  @response(200, {
    description: 'Parentesco model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parentesco)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {
            title: 'NewParentesco',
            exclude: ['id'],
          }),
        },
      },
    })
    parentesco: Omit<Parentesco, 'id'>,
  ): Promise<Parentesco> {
    return this.parentescoRepository.create(parentesco);
  }

  @get('/parentescos/count')
  @response(200, {
    description: 'Parentesco model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parentesco) where?: Where<Parentesco>,
  ): Promise<Count> {
    return this.parentescoRepository.count(where);
  }

  @get('/parentescos')
  @response(200, {
    description: 'Array of Parentesco model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parentesco, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parentesco) filter?: Filter<Parentesco>,
  ): Promise<Parentesco[]> {
    return this.parentescoRepository.find(filter);
  }

  @patch('/parentescos')
  @response(200, {
    description: 'Parentesco PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {partial: true}),
        },
      },
    })
    parentesco: Parentesco,
    @param.where(Parentesco) where?: Where<Parentesco>,
  ): Promise<Count> {
    return this.parentescoRepository.updateAll(parentesco, where);
  }

  @get('/parentescos/{id}')
  @response(200, {
    description: 'Parentesco model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parentesco, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Parentesco, {exclude: 'where'}) filter?: FilterExcludingWhere<Parentesco>
  ): Promise<Parentesco> {
    return this.parentescoRepository.findById(id, filter);
  }

  @patch('/parentescos/{id}')
  @response(204, {
    description: 'Parentesco PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parentesco, {partial: true}),
        },
      },
    })
    parentesco: Parentesco,
  ): Promise<void> {
    await this.parentescoRepository.updateById(id, parentesco);
  }

  @put('/parentescos/{id}')
  @response(204, {
    description: 'Parentesco PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parentesco: Parentesco,
  ): Promise<void> {
    await this.parentescoRepository.replaceById(id, parentesco);
  }

  @del('/parentescos/{id}')
  @response(204, {
    description: 'Parentesco DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parentescoRepository.deleteById(id);
  }
}
