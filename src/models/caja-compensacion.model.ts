import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';

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

  @hasMany(() => Empresa)
  empresas: Empresa[];

  constructor(data?: Partial<CajaCompensacion>) {
    super(data);
  }
}

export interface CajaCompensacionRelations {
  // describe navigational properties here
}

export type CajaCompensacionWithRelations = CajaCompensacion & CajaCompensacionRelations;
