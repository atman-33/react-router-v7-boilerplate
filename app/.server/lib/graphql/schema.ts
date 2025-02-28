import { builder } from './builder';
import { setupPlanetModule } from './modules/planet/planet.module';

setupPlanetModule();

export const schema = builder.toSchema();
