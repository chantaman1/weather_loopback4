import {inject} from '@loopback/core';
import {juggler} from '@loopback/service-proxy';
import * as config from './weather-api-datasource.datasource.json';

export class WeatherApiDatasourceDataSource extends juggler.DataSource {
  static dataSourceName = 'weatherAPIDatasource';

  constructor(
    @inject('datasources.config.weatherAPIDatasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
