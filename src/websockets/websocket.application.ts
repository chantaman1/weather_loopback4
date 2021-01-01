import {ApplicationConfig} from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import {HttpServer} from '@loopback/http-server';
import * as express from 'express';
import * as path from 'path';
import { Constructor } from "@loopback/context";
import { Namespace } from "socket.io";
import {WebSocketController} from './controllers';
import {WebSocketServer} from './websocket.server';

// tslint:disable:no-any

export class WebSocketDemoApplication extends RestApplication {
  readonly httpServer: HttpServer;
  readonly wsServer: WebSocketServer;

  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.httpServer = new HttpServer(this.requestHandler, options.websocket);
    this.wsServer = new WebSocketServer(this.httpServer);
    this.wsServer.route(WebSocketController, '/');
  }

  public websocketRoute(controllerClass: Constructor<any>, namespace?: string | RegExp): Namespace {
    return this.wsServer.route(controllerClass, namespace) as Namespace;
  }

  public async start(): Promise<void> {
    await this.wsServer.start();
    await super.start();
  }

  public async stop(): Promise<void> {
    await this.wsServer.stop();
    await super.stop();
  }
}
