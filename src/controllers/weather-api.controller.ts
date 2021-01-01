import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {LatitudeLongitudeRepository, WeatherApiRepository, ApiErrorRepository} from '../repositories';
import {WeatherApiService} from '../services/weather-api-service.service';
import {LatitudeLongitude, ApiError} from '../models';

export class WeatherApiController {

  private CITIES = ['santiago', 'zurich', 'auckland', 'georgia', 'londres', 'sydney'];

  constructor(
    @inject('services.WeatherApiService')
    private weatherAPIService: WeatherApiService,
    @repository(LatitudeLongitudeRepository)
    private latitudeLongitudeRepository: LatitudeLongitudeRepository,
    @repository(WeatherApiRepository)
    private weatherApiRepository: WeatherApiRepository,
    @repository(ApiErrorRepository)
    private apiErrorRepository: ApiErrorRepository,
  ){ }

  //this function let get the weather from a city.
  //uses the param 'city'.
  //gives out the weather from the given city.
  async getWeatherFromCity(city: string) {
    if(Math.random() < 0.1){
      //let create a error object.
      let err = new ApiError();
      //then we send back to the client the error that happened.
      return err.newError('How unfortunate! The API Request Failed');
    } else {
      //this let us get the latitude and longitude of a given city.
      const data = await this.latitudeLongitudeRepository.getDocument(city);
      if (data == null){
        //if there´s no city which match the redis db, then we throw an exception.
        let err = new ApiError();
        return err.newError('Not found');
      } else {
        //if there´s no exception at all, then we use the data obtained from the weather api.
        let weatherData = this.weatherAPIService.getrestdata(data.latitude, data.longitude);
        //lets update redis info about the weather for the city.
        await this.weatherApiRepository.storeWeather(city, weatherData);
        //then, we return the data.
        return weatherData;
      }
    }
  }

  //this function update the weather from redis and also
  //help to send the updated weather to the web socket.
  async updateWeather(){
    var weatherFromCities:any[] = [];
    for (let city in this.CITIES){
       let data = await this.repeatRequest( async () => this.getWeatherFromCity(city), async (err: any) => {
         if(err.message == "How unfortunate! The API Request Failed"){
           await this.apiErrorRepository.storeHash(new Date(), err);
         }
       });
       await weatherFromCities.push(data);
    }
    return weatherFromCities;
  }

  //this function return a promise.
  //this function let us wait a given 'ms' before doing something else.
  async myTimeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //this function let us repeat a function again
  //if an error is encountered.
  async repeatRequest(funct: any, err: any): Promise<any>{
    try {
      return await funct();
    } catch (functErr){
      if(functErr){
        await this.myTimeout(1000);
        return await this.repeatRequest(funct, err);
      }
    }
  }
}
