import {Entity, model, property} from '@loopback/repository';

@model()
export class Sindicato extends Entity {
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


  constructor(data?: Partial<Sindicato>) {
    super(data);
  }
}

export interface SindicatoRelations {
  // describe navigational properties here
}

export type SindicatoWithRelations = Sindicato & SindicatoRelations;
