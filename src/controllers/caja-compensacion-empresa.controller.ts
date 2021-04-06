import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CajaCompensacion,
  Empresa,
} from '../models';
import {CajaCompensacionRepository} from '../repositories';

export class CajaCompensacionEmpresaController {
  constructor(
    @repository(CajaCompensacionRepository) protected cajaCompensacionRepository: CajaCompensacionRepository,
  ) { }

  @get('/caja-compensacions/{id}/empresas', {
    responses: {
      '200': {
        description: 'Array of CajaCompensacion has many Empresa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empresa>,
  ): Promise<Empresa[]> {
    return this.cajaCompensacionRepository.empresas(id).find(filter);
  }

  @post('/caja-compensacions/{id}/empresas', {
    responses: {
      '200': {
        description: 'CajaCompensacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empresa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CajaCompensacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresaInCajaCompensacion',
            exclude: ['id'],
            optional: ['cajaCompensacionId']
          }),
        },
      },
    }) empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.cajaCompensacionRepository.empresas(id).create(empresa);
  }

  @patch('/caja-compensacions/{id}/empresas', {
    responses: {
      '200': {
        description: 'CajaCompensacion.Empresa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Partial<Empresa>,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.cajaCompensacionRepository.empresas(id).patch(empresa, where);
  }

  @del('/caja-compensacions/{id}/empresas', {
    responses: {
      '200': {
        description: 'CajaCompensacion.Empresa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.cajaCompensacionRepository.empresas(id).delete(where);
  }
}
