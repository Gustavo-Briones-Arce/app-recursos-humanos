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
  Empleado,
  Carga,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoCargaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/cargas', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Carga',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carga)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Carga>,
  ): Promise<Carga[]> {
    return this.empleadoRepository.cargas(id).find(filter);
  }

  @post('/empleados/{id}/cargas', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Carga)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carga, {
            title: 'NewCargaInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) carga: Omit<Carga, 'id'>,
  ): Promise<Carga> {
    return this.empleadoRepository.cargas(id).create(carga);
  }

  @patch('/empleados/{id}/cargas', {
    responses: {
      '200': {
        description: 'Empleado.Carga PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carga, {partial: true}),
        },
      },
    })
    carga: Partial<Carga>,
    @param.query.object('where', getWhereSchemaFor(Carga)) where?: Where<Carga>,
  ): Promise<Count> {
    return this.empleadoRepository.cargas(id).patch(carga, where);
  }

  @del('/empleados/{id}/cargas', {
    responses: {
      '200': {
        description: 'Empleado.Carga DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Carga)) where?: Where<Carga>,
  ): Promise<Count> {
    return this.empleadoRepository.cargas(id).delete(where);
  }
}
