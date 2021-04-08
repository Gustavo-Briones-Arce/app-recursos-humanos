import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parentesco} from './parentesco.model';

@model()
export class Carga extends Entity {
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
  rut: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  empleadoId?: string;

  @belongsTo(() => Parentesco)
  parentescoId: string;

  constructor(data?: Partial<Carga>) {
    super(data);
  }
}

export interface CargaRelations {
  // describe navigational properties here
}

export type CargaWithRelations = Carga & CargaRelations;
