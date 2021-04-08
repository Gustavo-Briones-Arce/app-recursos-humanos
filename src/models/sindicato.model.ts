import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';

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

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Sindicato>) {
    super(data);
  }
}

export interface SindicatoRelations {
  // describe navigational properties here
}

export type SindicatoWithRelations = Sindicato & SindicatoRelations;
