import {inject} from '@loopback/context';
import {Socket} from 'socket.io';
import {ws} from '../websockets/decorators/websocket.decorator';
import {repository} from '@loopback/repository';

export class WebSocketController {

  constructor(
    @ws.socket()
    private socket: Socket,
  ){ }

  @ws.connect()
  async connect(socket: Socket){
    console.log('Client connected: %s', this.socket.id);
    await this.socket.join('weather_room');
    await this.socket.emit('weather', 'this.updateWeather()');

    setInterval( async () => {
      await this.socket.emit('weather', 'this.updateWeather()');
    }, 10000);
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
