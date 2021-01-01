import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {WeatherApiModel} from '../models';
import {RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { promisify } from "util";

export class WeatherApiRepository extends DefaultKeyValueRepository<
  WeatherApiModel
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(WeatherApiModel, dataSource);
  }

  //this lets us store the city and coords.
  //the key is the city, and documents is the latitudeLongitude object
  //which as 'latitude' and 'longitude' as atributes of type number.
  async storeWeather(key: string, documents: WeatherApiModel): Promise<boolean> {
    const connector = this.kvModelClass.dataSource!.connector!;

    const execute = promisify((cmd: string, args: any[], cb: Function) => {
      connector.execute!(cmd, args, cb);
    });
    await execute('MULTI', []);
    await this.set(key, documents);
    const setResult = await execute('EXEC', []);
    return setResult == null ? false : true;
  }
}
