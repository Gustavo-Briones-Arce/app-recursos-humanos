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
import {TipoCuenta} from '../models';
import {TipoCuentaRepository} from '../repositories';

export class TipoCuentaController {
  constructor(
    @repository(TipoCuentaRepository)
    public tipoCuentaRepository : TipoCuentaRepository,
  ) {}

  @post('/tipo-cuentas')
  @response(200, {
    description: 'TipoCuenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCuenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCuenta, {
            title: 'NewTipoCuenta',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCuenta: Omit<TipoCuenta, 'id'>,
  ): Promise<TipoCuenta> {
    return this.tipoCuentaRepository.create(tipoCuenta);
  }

  @get('/tipo-cuentas/count')
  @response(200, {
    description: 'TipoCuenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCuenta) where?: Where<TipoCuenta>,
  ): Promise<Count> {
    return this.tipoCuentaRepository.count(where);
  }

  @get('/tipo-cuentas')
  @response(200, {
    description: 'Array of TipoCuenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCuenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCuenta) filter?: Filter<TipoCuenta>,
  ): Promise<TipoCuenta[]> {
    return this.tipoCuentaRepository.find(filter);
  }

  @patch('/tipo-cuentas')
  @response(200, {
    description: 'TipoCuenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCuenta, {partial: true}),
        },
      },
    })
    tipoCuenta: TipoCuenta,
    @param.where(TipoCuenta) where?: Where<TipoCuenta>,
  ): Promise<Count> {
    return this.tipoCuentaRepository.updateAll(tipoCuenta, where);
  }

  @get('/tipo-cuentas/{id}')
  @response(200, {
    description: 'TipoCuenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCuenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoCuenta, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoCuenta>
  ): Promise<TipoCuenta> {
    return this.tipoCuentaRepository.findById(id, filter);
  }

  @patch('/tipo-cuentas/{id}')
  @response(204, {
    description: 'TipoCuenta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCuenta, {partial: true}),
        },
      },
    })
    tipoCuenta: TipoCuenta,
  ): Promise<void> {
    await this.tipoCuentaRepository.updateById(id, tipoCuenta);
  }

  @put('/tipo-cuentas/{id}')
  @response(204, {
    description: 'TipoCuenta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoCuenta: TipoCuenta,
  ): Promise<void> {
    await this.tipoCuentaRepository.replaceById(id, tipoCuenta);
  }

  @del('/tipo-cuentas/{id}')
  @response(204, {
    description: 'TipoCuenta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoCuentaRepository.deleteById(id);
  }
}
