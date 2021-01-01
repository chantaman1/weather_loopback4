import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {WeatherApiDatasourceDataSource} from '../datasources';
import {WeatherApiModel} from '../models';


export interface WeatherApiService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  //getrestdata will call the rest api, given lat and lon.
  getrestdata(lat: number, lon: number): WeatherApiModel;
}

export class WeatherApiServiceProvider implements Provider<WeatherApiService> {
  constructor(
    // weatherAPIDatasource must match the name property in the datasource json file
    @inject('datasources.weatherAPIDatasource')
    protected dataSource: WeatherApiDatasourceDataSource = new WeatherApiDatasourceDataSource(),
  ) {}

  value(): Promise<WeatherApiService> {
    return getService(this.dataSource);
  }
}
