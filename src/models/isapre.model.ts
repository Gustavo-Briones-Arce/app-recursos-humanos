import {Entity, model, property} from '@loopback/repository';

@model()
export class Isapre extends Entity {
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


  constructor(data?: Partial<Isapre>) {
    super(data);
  }
}

export interface IsapreRelations {
  // describe navigational properties here
}

export type IsapreWithRelations = Isapre & IsapreRelations;
