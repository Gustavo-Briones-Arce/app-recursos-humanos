import {Entity, model, property} from '@loopback/repository';

@model()
export class Afp extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  comision: number;


  constructor(data?: Partial<Afp>) {
    super(data);
  }
}

export interface AfpRelations {
  // describe navigational properties here
}

export type AfpWithRelations = Afp & AfpRelations;
