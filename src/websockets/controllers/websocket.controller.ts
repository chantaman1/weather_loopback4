import {inject} from '@loopback/context';
import {Socket} from 'socket.io';
import {ws} from '../decorators/websocket.decorator';
import {repository} from '@loopback/repository';


/**
 * A demo controller for websocket
 */
export class WebSocketController {

  constructor(
    @ws.socket()
    private socket: Socket,
  ){ }

  @ws.connect()
  async connect(socket: Socket){
    console.log('Client connected: %s', this.socket.id);
    await this.socket.join('weather_room');
  };

  @ws.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    console.log('Message: %s', args);
  }

  @ws.disconnect()
  async disconect(){
    console.log('Client disconnected: %s', this.socket.id);
  };
}
