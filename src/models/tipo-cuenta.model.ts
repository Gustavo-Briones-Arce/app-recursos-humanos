import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoCuenta extends Entity {
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


  constructor(data?: Partial<TipoCuenta>) {
    super(data);
  }
}

export interface TipoCuentaRelations {
  // describe navigational properties here
}

export type TipoCuentaWithRelations = TipoCuenta & TipoCuentaRelations;
