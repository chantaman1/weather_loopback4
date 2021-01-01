import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ApiError extends Entity {
  @property({
    type: 'string',
    required: true,
    default: 0,
  })
  error: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ApiError>) {
    super(data);
  }
}

export interface ApiErrorRelations {
  // describe navigational properties here
}

export type ApiErrorWithRelations = ApiError & ApiErrorRelations;
