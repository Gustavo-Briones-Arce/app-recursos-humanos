import {Entity, model, property} from '@loopback/repository';

@model()
export class Parentesco extends Entity {
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


  constructor(data?: Partial<Parentesco>) {
    super(data);
  }
}

export interface ParentescoRelations {
  // describe navigational properties here
}

export type ParentescoWithRelations = Parentesco & ParentescoRelations;
