import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class MovimientoMensual extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaTermino: string;

  @property({
    type: 'boolean',
    default: 0,
  })
  imponible?: boolean;

  @property({
    type: 'boolean',
    default: 0,
  })
  tributable?: boolean;

  @property({
    type: 'string',
  })
  observacion?: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<MovimientoMensual>) {
    super(data);
  }
}

export interface MovimientoMensualRelations {
  // describe navigational properties here
}

export type MovimientoMensualWithRelations = MovimientoMensual & MovimientoMensualRelations;
