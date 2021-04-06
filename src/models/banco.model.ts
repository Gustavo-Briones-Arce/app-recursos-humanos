import {Entity, model, property} from '@loopback/repository';

@model()
export class Banco extends Entity {
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


  constructor(data?: Partial<Banco>) {
    super(data);
  }
}

export interface BancoRelations {
  // describe navigational properties here
}

export type BancoWithRelations = Banco & BancoRelations;
