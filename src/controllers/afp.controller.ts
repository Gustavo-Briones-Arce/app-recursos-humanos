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
import {Afp} from '../models';
import {AfpRepository} from '../repositories';

export class AfpController {
  constructor(
    @repository(AfpRepository)
    public afpRepository : AfpRepository,
  ) {}

  @post('/afps')
  @response(200, {
    description: 'Afp model instance',
    content: {'application/json': {schema: getModelSchemaRef(Afp)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afp, {
            title: 'NewAfp',
            exclude: ['id'],
          }),
        },
      },
    })
    afp: Omit<Afp, 'id'>,
  ): Promise<Afp> {
    return this.afpRepository.create(afp);
  }

  @get('/afps/count')
  @response(200, {
    description: 'Afp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Afp) where?: Where<Afp>,
  ): Promise<Count> {
    return this.afpRepository.count(where);
  }

  @get('/afps')
  @response(200, {
    description: 'Array of Afp model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Afp, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Afp) filter?: Filter<Afp>,
  ): Promise<Afp[]> {
    return this.afpRepository.find(filter);
  }

  @patch('/afps')
  @response(200, {
    description: 'Afp PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afp, {partial: true}),
        },
      },
    })
    afp: Afp,
    @param.where(Afp) where?: Where<Afp>,
  ): Promise<Count> {
    return this.afpRepository.updateAll(afp, where);
  }

  @get('/afps/{id}')
  @response(200, {
    description: 'Afp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Afp, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Afp, {exclude: 'where'}) filter?: FilterExcludingWhere<Afp>
  ): Promise<Afp> {
    return this.afpRepository.findById(id, filter);
  }

  @patch('/afps/{id}')
  @response(204, {
    description: 'Afp PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afp, {partial: true}),
        },
      },
    })
    afp: Afp,
  ): Promise<void> {
    await this.afpRepository.updateById(id, afp);
  }

  @put('/afps/{id}')
  @response(204, {
    description: 'Afp PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() afp: Afp,
  ): Promise<void> {
    await this.afpRepository.replaceById(id, afp);
  }

  @del('/afps/{id}')
  @response(204, {
    description: 'Afp DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.afpRepository.deleteById(id);
  }
}
