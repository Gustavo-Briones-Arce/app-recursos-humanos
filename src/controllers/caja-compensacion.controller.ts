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
import {CajaCompensacion} from '../models';
import {CajaCompensacionRepository} from '../repositories';

export class CajaCompensacionController {
  constructor(
    @repository(CajaCompensacionRepository)
    public cajaCompensacionRepository : CajaCompensacionRepository,
  ) {}

  @post('/caja-compensacion')
  @response(200, {
    description: 'CajaCompensacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(CajaCompensacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaCompensacion, {
            title: 'NewCajaCompensacion',
            exclude: ['id'],
          }),
        },
      },
    })
    cajaCompensacion: Omit<CajaCompensacion, 'id'>,
  ): Promise<CajaCompensacion> {
    return this.cajaCompensacionRepository.create(cajaCompensacion);
  }

  @get('/caja-compensacion/count')
  @response(200, {
    description: 'CajaCompensacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CajaCompensacion) where?: Where<CajaCompensacion>,
  ): Promise<Count> {
    return this.cajaCompensacionRepository.count(where);
  }

  @get('/caja-compensacion')
  @response(200, {
    description: 'Array of CajaCompensacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CajaCompensacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CajaCompensacion) filter?: Filter<CajaCompensacion>,
  ): Promise<CajaCompensacion[]> {
    return this.cajaCompensacionRepository.find(filter);
  }

  @patch('/caja-compensacion')
  @response(200, {
    description: 'CajaCompensacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaCompensacion, {partial: true}),
        },
      },
    })
    cajaCompensacion: CajaCompensacion,
    @param.where(CajaCompensacion) where?: Where<CajaCompensacion>,
  ): Promise<Count> {
    return this.cajaCompensacionRepository.updateAll(cajaCompensacion, where);
  }

  @get('/caja-compensacion/{id}')
  @response(200, {
    description: 'CajaCompensacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CajaCompensacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CajaCompensacion, {exclude: 'where'}) filter?: FilterExcludingWhere<CajaCompensacion>
  ): Promise<CajaCompensacion> {
    return this.cajaCompensacionRepository.findById(id, filter);
  }

  @patch('/caja-compensacion/{id}')
  @response(204, {
    description: 'CajaCompensacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaCompensacion, {partial: true}),
        },
      },
    })
    cajaCompensacion: CajaCompensacion,
  ): Promise<void> {
    await this.cajaCompensacionRepository.updateById(id, cajaCompensacion);
  }

  @put('/caja-compensacion/{id}')
  @response(204, {
    description: 'CajaCompensacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cajaCompensacion: CajaCompensacion,
  ): Promise<void> {
    await this.cajaCompensacionRepository.replaceById(id, cajaCompensacion);
  }

  @del('/caja-compensacion/{id}')
  @response(204, {
    description: 'CajaCompensacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cajaCompensacionRepository.deleteById(id);
  }
}
