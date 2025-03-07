import { builder } from './builder';
import { setupPlanetStarClusterModule } from './modules/planet-star-cluster/planet-star-cluster.module';
import { setupPlanetModule } from './modules/planet/planet.module';
import { setupStarClusterModule } from './modules/star-cluster/star-cluster.module';

setupPlanetModule();
setupStarClusterModule();
setupPlanetStarClusterModule();

export const schema = builder.toSchema();
