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
import {MovimientoMensual} from '../models';
import {MovimientoMensualRepository} from '../repositories';

export class MovimientoMensualController {
  constructor(
    @repository(MovimientoMensualRepository)
    public movimientoMensualRepository : MovimientoMensualRepository,
  ) {}

  @post('/movimientos-mensuales')
  @response(200, {
    description: 'MovimientoMensual model instance',
    content: {'application/json': {schema: getModelSchemaRef(MovimientoMensual)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MovimientoMensual, {
            title: 'NewMovimientoMensual',
            exclude: ['id'],
          }),
        },
      },
    })
    movimientoMensual: Omit<MovimientoMensual, 'id'>,
  ): Promise<MovimientoMensual> {
    return this.movimientoMensualRepository.create(movimientoMensual);
  }

  @get('/movimientos-mensuales/count')
  @response(200, {
    description: 'MovimientoMensual model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MovimientoMensual) where?: Where<MovimientoMensual>,
  ): Promise<Count> {
    return this.movimientoMensualRepository.count(where);
  }

  @get('/movimientos-mensuales')
  @response(200, {
    description: 'Array of MovimientoMensual model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MovimientoMensual, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MovimientoMensual) filter?: Filter<MovimientoMensual>,
  ): Promise<MovimientoMensual[]> {
    return this.movimientoMensualRepository.find(filter);
  }

  @patch('/movimientos-mensuales')
  @response(200, {
    description: 'MovimientoMensual PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MovimientoMensual, {partial: true}),
        },
      },
    })
    movimientoMensual: MovimientoMensual,
    @param.where(MovimientoMensual) where?: Where<MovimientoMensual>,
  ): Promise<Count> {
    return this.movimientoMensualRepository.updateAll(movimientoMensual, where);
  }

  @get('/movimientos-mensuales/{id}')
  @response(200, {
    description: 'MovimientoMensual model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MovimientoMensual, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MovimientoMensual, {exclude: 'where'}) filter?: FilterExcludingWhere<MovimientoMensual>
  ): Promise<MovimientoMensual> {
    return this.movimientoMensualRepository.findById(id, filter);
  }

  @patch('/movimientos-mensuales/{id}')
  @response(204, {
    description: 'MovimientoMensual PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MovimientoMensual, {partial: true}),
        },
      },
    })
    movimientoMensual: MovimientoMensual,
  ): Promise<void> {
    await this.movimientoMensualRepository.updateById(id, movimientoMensual);
  }

  @put('/movimientos-mensuales/{id}')
  @response(204, {
    description: 'MovimientoMensual PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() movimientoMensual: MovimientoMensual,
  ): Promise<void> {
    await this.movimientoMensualRepository.replaceById(id, movimientoMensual);
  }

  @del('/movimientos-mensuales/{id}')
  @response(204, {
    description: 'MovimientoMensual DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.movimientoMensualRepository.deleteById(id);
  }
}
