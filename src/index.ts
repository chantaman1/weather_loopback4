import { WebsocketApplication, ApplicationConfig } from './application';
export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new WebsocketApplication(options);
  await app.boot();
  await app.start();

  console.log(`Server is running at 'http://localhost:3000/'`);
  console.log(`Try 'http://localhost:3000/ping'`);

  return app;
}
