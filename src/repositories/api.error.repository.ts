import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {ApiError} from '../models';
import {RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { promisify } from "util";

export class ApiErrorRepository extends DefaultKeyValueRepository<
  ApiError
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(ApiError, dataSource);
  }

  //this let us create an error, useful to check
  //if the request came with an error from the weather api.
  async newError(error: string):Promise<Error>{
    let err = Error(error);
    err.name = 'Request Error';
    err.message = error;
    return err;
  }

  //this let us get the hash based on the hash-name.
  async getHash(hash: string): Promise<ApiError> {
    const connector = this.kvModelClass.dataSource!.connector!;

    const execute = promisify((cmd: string, args: any[], cb: Function) => {
      connector.execute!(cmd, args, cb);
    });

    await execute('HGET', [hash]);
    let document = await this.get(hash);
    return document;
  }

  //this function let us store the errors on api.errors hash.
  //the key is a timestamp date type, the error is a error type from model which has
  //'error' as atribute of type string.
  async storeHash(key: Date, error: ApiError): Promise<boolean> {
    const connector = this.kvModelClass.dataSource!.connector!;

    const execute = promisify((cmd: string, args: any[], cb: Function) => {
      connector.execute!(cmd, args, cb);
    });
    await execute('HMSET', ['api.errors', key.toString(), error]);
    await execute('MULTI', []);
    await this.set(key.toString(), error);
    const setResult = await execute('EXEC', []);
    return setResult == null ? false : true;
  }

}
