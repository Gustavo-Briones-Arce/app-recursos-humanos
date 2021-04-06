import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Carga>) {
    super(data);
  }
}

export interface CargaRelations {
  // describe navigational properties here
}

export type CargaWithRelations = Carga & CargaRelations;
