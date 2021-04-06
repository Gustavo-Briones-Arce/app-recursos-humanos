import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {CajaCompensacion} from './caja-compensacion.model';
import {Mutual} from './mutual.model';
import {Departamento} from './departamento.model';

@model()
export class Empresa extends Entity {
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
    type: 'string',
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
    required: true,
  })
  repreLegal: string;

  @property({
    type: 'string',
    required: true,
  })
  rutRepreLegal: string;

  @belongsTo(() => CajaCompensacion)
  cajaCompensacionId: string;

  @belongsTo(() => Mutual)
  mutualId: string;

  @hasMany(() => Departamento)
  departamentos: Departamento[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
