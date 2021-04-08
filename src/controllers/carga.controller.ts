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
import {Carga} from '../models';
import {CargaRepository} from '../repositories';

export class CargaController {
  constructor(
    @repository(CargaRepository)
    public cargaRepository : CargaRepository,
  ) {}

  @post('/cargas')
  @response(200, {
    description: 'Carga model instance',
    content: {'application/json': {schema: getModelSchemaRef(Carga)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carga, {
            title: 'NewCarga',
            exclude: ['id'],
          }),
        },
      },
    })
    carga: Omit<Carga, 'id'>,
  ): Promise<Carga> {
    return this.cargaRepository.create(carga);
  }

  @get('/cargas/count')
  @response(200, {
    description: 'Carga model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Carga) where?: Where<Carga>,
  ): Promise<Count> {
    return this.cargaRepository.count(where);
  }

  @get('/cargas')
  @response(200, {
    description: 'Array of Carga model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Carga, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Carga) filter?: Filter<Carga>,
  ): Promise<Carga[]> {
    return this.cargaRepository.find(filter);
  }

  @patch('/cargas')
  @response(200, {
    description: 'Carga PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carga, {partial: true}),
        },
      },
    })
    carga: Carga,
    @param.where(Carga) where?: Where<Carga>,
  ): Promise<Count> {
    return this.cargaRepository.updateAll(carga, where);
  }

  @get('/cargas/{id}')
  @response(200, {
    description: 'Carga model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Carga, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Carga, {exclude: 'where'}) filter?: FilterExcludingWhere<Carga>
  ): Promise<Carga> {
    return this.cargaRepository.findById(id, filter);
  }

  @patch('/cargas/{id}')
  @response(204, {
    description: 'Carga PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carga, {partial: true}),
        },
      },
    })
    carga: Carga,
  ): Promise<void> {
    await this.cargaRepository.updateById(id, carga);
  }

  @put('/cargas/{id}')
  @response(204, {
    description: 'Carga PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carga: Carga,
  ): Promise<void> {
    await this.cargaRepository.replaceById(id, carga);
  }

  @del('/cargas/{id}')
  @response(204, {
    description: 'Carga DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cargaRepository.deleteById(id);
  }
}
