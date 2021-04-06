import {Entity, model, property} from '@loopback/repository';

@model()
export class CajaCompensacion extends Entity {
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


  constructor(data?: Partial<CajaCompensacion>) {
    super(data);
  }
}

export interface CajaCompensacionRelations {
  // describe navigational properties here
}

export type CajaCompensacionWithRelations = CajaCompensacion & CajaCompensacionRelations;
