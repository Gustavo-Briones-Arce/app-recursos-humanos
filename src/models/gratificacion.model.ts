import {Entity, model, property} from '@loopback/repository';

@model()
export class Gratificacion extends Entity {
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


  constructor(data?: Partial<Gratificacion>) {
    super(data);
  }
}

export interface GratificacionRelations {
  // describe navigational properties here
}

export type GratificacionWithRelations = Gratificacion & GratificacionRelations;
