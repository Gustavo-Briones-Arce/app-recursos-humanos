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
import {Sindicato} from '../models';
import {SindicatoRepository} from '../repositories';

export class SindicatoController {
  constructor(
    @repository(SindicatoRepository)
    public sindicatoRepository : SindicatoRepository,
  ) {}

  @post('/sindicatos')
  @response(200, {
    description: 'Sindicato model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sindicato)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sindicato, {
            title: 'NewSindicato',
            exclude: ['id'],
          }),
        },
      },
    })
    sindicato: Omit<Sindicato, 'id'>,
  ): Promise<Sindicato> {
    return this.sindicatoRepository.create(sindicato);
  }

  @get('/sindicatos/count')
  @response(200, {
    description: 'Sindicato model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sindicato) where?: Where<Sindicato>,
  ): Promise<Count> {
    return this.sindicatoRepository.count(where);
  }

  @get('/sindicatos')
  @response(200, {
    description: 'Array of Sindicato model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sindicato, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sindicato) filter?: Filter<Sindicato>,
  ): Promise<Sindicato[]> {
    return this.sindicatoRepository.find(filter);
  }

  @patch('/sindicatos')
  @response(200, {
    description: 'Sindicato PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sindicato, {partial: true}),
        },
      },
    })
    sindicato: Sindicato,
    @param.where(Sindicato) where?: Where<Sindicato>,
  ): Promise<Count> {
    return this.sindicatoRepository.updateAll(sindicato, where);
  }

  @get('/sindicatos/{id}')
  @response(200, {
    description: 'Sindicato model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sindicato, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sindicato, {exclude: 'where'}) filter?: FilterExcludingWhere<Sindicato>
  ): Promise<Sindicato> {
    return this.sindicatoRepository.findById(id, filter);
  }

  @patch('/sindicatos/{id}')
  @response(204, {
    description: 'Sindicato PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sindicato, {partial: true}),
        },
      },
    })
    sindicato: Sindicato,
  ): Promise<void> {
    await this.sindicatoRepository.updateById(id, sindicato);
  }

  @put('/sindicatos/{id}')
  @response(204, {
    description: 'Sindicato PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sindicato: Sindicato,
  ): Promise<void> {
    await this.sindicatoRepository.replaceById(id, sindicato);
  }

  @del('/sindicatos/{id}')
  @response(204, {
    description: 'Sindicato DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sindicatoRepository.deleteById(id);
  }
}
