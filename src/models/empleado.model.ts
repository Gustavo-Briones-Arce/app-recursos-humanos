import {Entity, model, property} from '@loopback/repository';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaIngreso: string;

  @property({
    type: 'boolean',
    default: 1,
  })
  chileno?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  sueldoBase: number;

  @property({
    type: 'boolean',
    default: 0,
  })
  jubilado?: boolean;

  @property({
    type: 'number',
  })
  planSalud?: number;

  @property({
    type: 'number',
  })
  nCuenta?: number;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'number',
  })
  tramoCargas?: number;


  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
