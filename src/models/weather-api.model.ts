import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class WeatherApiModel extends Entity {
  @property({
    required: true,
  })
  coord: Coord;
  
  @property({
    required: true,
  })
  weather: Weather[];

  @property({
    type: 'string',
    required: true,
  })
  base: string;

  @property({
    required: true,
  })
  main: Main;

  @property({
    type: 'number',
    required: true,
  })
  visibility: number;

  @property({
    required: true,
  })
  wind: Wind;

  @property({
    required: true,
  })
  clouds: Clouds;

  @property({
    type: 'number',
    required: true,
  })
  dt: number;

  @property({
    required: true,
  })
  sys: Sys;

  @property({
    type: 'number',
    required: true,
  })
  timezone: number;

  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  cod: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WeatherApiModel>) {
    super(data);
  }
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherApiModelRelations {
  // describe navigational properties here
}

export type WeatherApiModelWithRelations = WeatherApiModel & WeatherApiModelRelations;
