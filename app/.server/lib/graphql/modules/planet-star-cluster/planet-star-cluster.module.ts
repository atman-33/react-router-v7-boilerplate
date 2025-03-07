import { definePlanetStarClusterType } from './planet-star-cluster.type';

export const setupPlanetStarClusterModule = () => {
  definePlanetStarClusterType();
  console.log('PlanetStarCluster module has been defined');
};
