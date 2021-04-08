import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Afp} from './afp.model';
import {Banco} from './banco.model';
import {Carga} from './carga.model';
import {Contrato} from './contrato.model';
import {Departamento} from './departamento.model';
import {Gratificacion} from './gratificacion.model';
import {Isapre} from './isapre.model';
import {Sindicato} from './sindicato.model';
import {TipoCuenta} from './tipo-cuenta.model';

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
    type: 'boolean',
    default: 1,
  })
  afc?: boolean;

  @property({
    type: 'boolean',
    default: 1,
  })
  estado?: boolean;

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

  @belongsTo(() => Contrato)
  contratoId: string;

  @belongsTo(() => Gratificacion)
  gratificacionId: string;

  @belongsTo(() => Sindicato)
  sindicatoId: string;

  @belongsTo(() => Afp)
  afpId: string;

  @belongsTo(() => Isapre)
  isapreId: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @belongsTo(() => Banco)
  bancoId: string;

  @belongsTo(() => TipoCuenta)
  tipoCuentaId: string;

  @hasMany(() => Carga)
  cargas: Carga[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
