
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import { RestExplorerComponent } from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import { MySequence } from './sequence';
import { WebSocketDemoApplication } from "./websockets/websocket.application";
import { WebsocketControllerBooter } from "./websockets/websocket.booter";

export {ApplicationConfig};

export class WebsocketApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(WebSocketDemoApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);


    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    this.component(RestExplorerComponent);

    this.booters(WebsocketControllerBooter);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      websocketControllers: {
        dirs: ['controllers'],
        extensions: ['.controller.ws.js'],
        nested: true,
      },
    };
  }
}
