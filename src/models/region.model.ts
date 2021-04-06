import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comuna} from './comuna.model';

@model()
export class Region extends Entity {
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
  numero: string;

  @hasMany(() => Comuna)
  comunas: Comuna[];

  constructor(data?: Partial<Region>) {
    super(data);
  }
}

export interface RegionRelations {
  // describe navigational properties here
}

export type RegionWithRelations = Region & RegionRelations;
