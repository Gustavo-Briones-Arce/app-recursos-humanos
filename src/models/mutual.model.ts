import {Entity, model, property} from '@loopback/repository';

@model()
export class Mutual extends Entity {
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


  constructor(data?: Partial<Mutual>) {
    super(data);
  }
}

export interface MutualRelations {
  // describe navigational properties here
}

export type MutualWithRelations = Mutual & MutualRelations;
