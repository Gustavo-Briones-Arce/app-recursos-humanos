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
  Empresa,
  Departamento,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaDepartamentoController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento[]> {
    return this.empresaRepository.departamentos(id).find(filter);
  }

  @post('/empresas/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.empresaRepository.departamentos(id).create(departamento);
  }

  @patch('/empresas/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Empresa.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.empresaRepository.departamentos(id).patch(departamento, where);
  }

  @del('/empresas/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Empresa.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.empresaRepository.departamentos(id).delete(where);
  }
}
