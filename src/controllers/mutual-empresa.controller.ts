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
  Mutual,
  Empresa,
} from '../models';
import {MutualRepository} from '../repositories';

export class MutualEmpresaController {
  constructor(
    @repository(MutualRepository) protected mutualRepository: MutualRepository,
  ) { }

  @get('/mutuals/{id}/empresas', {
    responses: {
      '200': {
        description: 'Array of Mutual has many Empresa',
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
    return this.mutualRepository.empresas(id).find(filter);
  }

  @post('/mutuals/{id}/empresas', {
    responses: {
      '200': {
        description: 'Mutual model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empresa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mutual.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresaInMutual',
            exclude: ['id'],
            optional: ['mutualId']
          }),
        },
      },
    }) empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.mutualRepository.empresas(id).create(empresa);
  }

  @patch('/mutuals/{id}/empresas', {
    responses: {
      '200': {
        description: 'Mutual.Empresa PATCH success count',
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
    return this.mutualRepository.empresas(id).patch(empresa, where);
  }

  @del('/mutuals/{id}/empresas', {
    responses: {
      '200': {
        description: 'Mutual.Empresa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.mutualRepository.empresas(id).delete(where);
  }
}
