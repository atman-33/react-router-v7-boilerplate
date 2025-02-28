import { definePlanetResolver } from './planet.resolver';
import { definePlanetType } from './planet.type';

export const setupPlanetModule = () => {
  definePlanetType();
  definePlanetResolver();
  console.log('Planet module has been defined');
};
