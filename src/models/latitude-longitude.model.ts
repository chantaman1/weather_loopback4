import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class LatitudeLongitude extends Entity {
  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  latitude: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  longitude: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LatitudeLongitude>) {
    super(data);
  }
}

export interface LatitudeLongitudeRelations {
  // describe navigational properties here
}

export type LatitudeLongitudeWithRelations = LatitudeLongitude & LatitudeLongitudeRelations;
