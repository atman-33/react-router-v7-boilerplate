import { defineStarClusterResolver } from './star-cluster.resolver';
import { defineStarClusterType } from './star-cluster.type';

export const setupStarClusterModule = () => {
  defineStarClusterType();
  defineStarClusterResolver();
  console.log('StarCluster module has been defined');
};
