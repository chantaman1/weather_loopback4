import {inject, lifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './redis.datasource.json';

@lifeCycleObserver('datasource')
export class RedisDataSource extends juggler.DataSource {
  static readonly dataSourceName = config.name;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.redis', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  //disconnect datasource when app stops.
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
