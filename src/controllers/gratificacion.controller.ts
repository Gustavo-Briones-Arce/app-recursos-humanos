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
import {Gratificacion} from '../models';
import {GratificacionRepository} from '../repositories';

export class GratificacionController {
  constructor(
    @repository(GratificacionRepository)
    public gratificacionRepository : GratificacionRepository,
  ) {}

  @post('/gratificaciones')
  @response(200, {
    description: 'Gratificacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gratificacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gratificacion, {
            title: 'NewGratificacion',
            exclude: ['id'],
          }),
        },
      },
    })
    gratificacion: Omit<Gratificacion, 'id'>,
  ): Promise<Gratificacion> {
    return this.gratificacionRepository.create(gratificacion);
  }

  @get('/gratificaciones/count')
  @response(200, {
    description: 'Gratificacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gratificacion) where?: Where<Gratificacion>,
  ): Promise<Count> {
    return this.gratificacionRepository.count(where);
  }

  @get('/gratificaciones')
  @response(200, {
    description: 'Array of Gratificacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gratificacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gratificacion) filter?: Filter<Gratificacion>,
  ): Promise<Gratificacion[]> {
    return this.gratificacionRepository.find(filter);
  }

  @patch('/gratificaciones')
  @response(200, {
    description: 'Gratificacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gratificacion, {partial: true}),
        },
      },
    })
    gratificacion: Gratificacion,
    @param.where(Gratificacion) where?: Where<Gratificacion>,
  ): Promise<Count> {
    return this.gratificacionRepository.updateAll(gratificacion, where);
  }

  @get('/gratificaciones/{id}')
  @response(200, {
    description: 'Gratificacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gratificacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gratificacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Gratificacion>
  ): Promise<Gratificacion> {
    return this.gratificacionRepository.findById(id, filter);
  }

  @patch('/gratificaciones/{id}')
  @response(204, {
    description: 'Gratificacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gratificacion, {partial: true}),
        },
      },
    })
    gratificacion: Gratificacion,
  ): Promise<void> {
    await this.gratificacionRepository.updateById(id, gratificacion);
  }

  @put('/gratificaciones/{id}')
  @response(204, {
    description: 'Gratificacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gratificacion: Gratificacion,
  ): Promise<void> {
    await this.gratificacionRepository.replaceById(id, gratificacion);
  }

  @del('/gratificaciones/{id}')
  @response(204, {
    description: 'Gratificacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gratificacionRepository.deleteById(id);
  }
}
