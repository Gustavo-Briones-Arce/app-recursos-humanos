import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';

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

  @hasMany(() => Empresa)
  empresas: Empresa[];

  constructor(data?: Partial<Mutual>) {
    super(data);
  }
}

export interface MutualRelations {
  // describe navigational properties here
}

export type MutualWithRelations = Mutual & MutualRelations;
