import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LatitudeLongitudeRepository} from '../repositories';
import {LatitudeLongitude} from '../models';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class RedisDataFillerObserver implements LifeCycleObserver {
  constructor(
    /**
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    **/
    @repository(LatitudeLongitudeRepository)
    private latitudeLongitudeRepository: LatitudeLongitudeRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    //saving the data from cities and their coords.
    //coordinates for Santiago.
    let santiago: LatitudeLongitude = new LatitudeLongitude();
    santiago.latitude = -33.45;
    santiago.longitude = -70.64;
    await this.latitudeLongitudeRepository.storeCoords('santiago', santiago);

    //coordinates for Zurich.
    let zurich: LatitudeLongitude = new LatitudeLongitude();
    zurich.latitude = 47.36;
    zurich.longitude = 8.55;
    await this.latitudeLongitudeRepository.storeCoords('zurich', zurich);

    //coordinates for Auckland.
    let auckland: LatitudeLongitude = new LatitudeLongitude();
    auckland.latitude = -36.84;
    auckland.longitude = 174.76;
    await this.latitudeLongitudeRepository.storeCoords('auckland', auckland);

    //coordinates for Sydney.
    let sydney: LatitudeLongitude = new LatitudeLongitude();
    sydney.latitude = -33.86;
    sydney.longitude = 151.20;
    await this.latitudeLongitudeRepository.storeCoords('sydney', sydney);

    //coordinates for Londres.
    let londres: LatitudeLongitude = new LatitudeLongitude();
    londres.latitude = 51.50;
    londres.longitude = -0.11;
    await this.latitudeLongitudeRepository.storeCoords('londres', londres);

    //coordinates for Georgia.
    let georgia: LatitudeLongitude = new LatitudeLongitude();
    georgia.latitude = 33.24;
    georgia.longitude = -83.44;
    await this.latitudeLongitudeRepository.storeCoords('georgia', georgia);
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
