import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {LatitudeLongitude} from '../models';
import {RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { promisify } from "util";

export class LatitudeLongitudeRepository extends DefaultKeyValueRepository<
  LatitudeLongitude
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(LatitudeLongitude, dataSource);
  }

  //this let us get the latitude and longitude from a city.
  //the key is a city.
  //the output is 'latitude' and 'longitude' which both are of type number.
  async getDocument(documentName: string): Promise<LatitudeLongitude> {
    const connector = this.kvModelClass.dataSource!.connector!;

    const execute = promisify((cmd: string, args: any[], cb: Function) => {
      connector.execute!(cmd, args, cb);
    });

    await execute('WATCH', [documentName]);
    let document = await this.get(documentName);
    return document || null;
  }

  //this lets us store the city and coords.
  //the key is the city, and documents is the latitudeLongitude object
  //which as 'latitude' and 'longitude' as atributes of type number.
  async storeCoords(key: string, documents: LatitudeLongitude): Promise<boolean> {
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
