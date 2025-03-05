/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string };
};

export type CreatePlanetInput = {
  name: Scalars['String']['input'];
  starClusterIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateStarClusterInput = {
  name: Scalars['String']['input'];
};

export type DeletePlanetInput = {
  id: Scalars['String']['input'];
};

export type DeleteStarClusterInput = {
  id: Scalars['String']['input'];
};

export type GetPlanetArgs = {
  id: Scalars['String']['input'];
};

export type GetStarClusterArgs = {
  id: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlanet: Planet;
  createStarCluster: StarCluster;
  deletePlanet?: Maybe<Planet>;
  deleteStarCluster?: Maybe<StarCluster>;
  updatePlanet?: Maybe<Planet>;
  updateStarCluster?: Maybe<StarCluster>;
};

export type MutationCreatePlanetArgs = {
  input: CreatePlanetInput;
};

export type MutationCreateStarClusterArgs = {
  input: CreateStarClusterInput;
};

export type MutationDeletePlanetArgs = {
  input: DeletePlanetInput;
};

export type MutationDeleteStarClusterArgs = {
  input: DeleteStarClusterInput;
};

export type MutationUpdatePlanetArgs = {
  input: UpdatePlanetInput;
};

export type MutationUpdateStarClusterArgs = {
  input: UpdateStarClusterInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Planet = Node & {
  __typename?: 'Planet';
  clusters?: Maybe<Array<PlanetStarCluster>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type PlanetStarCluster = Node & {
  __typename?: 'PlanetStarCluster';
  id: Scalars['ID']['output'];
  planet?: Maybe<Planet>;
  starCluster?: Maybe<StarCluster>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  planet?: Maybe<Planet>;
  planets?: Maybe<QueryPlanetsConnection>;
  starCluster?: Maybe<StarCluster>;
  starClusters?: Maybe<QueryStarClustersConnection>;
};

export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryPlanetArgs = {
  args: GetPlanetArgs;
};

export type QueryPlanetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryStarClusterArgs = {
  args: GetStarClusterArgs;
};

export type QueryStarClustersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPlanetsConnection = {
  __typename?: 'QueryPlanetsConnection';
  edges?: Maybe<Array<Maybe<QueryPlanetsConnectionEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QueryPlanetsConnectionEdge = {
  __typename?: 'QueryPlanetsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Planet>;
};

export type QueryStarClustersConnection = {
  __typename?: 'QueryStarClustersConnection';
  edges?: Maybe<Array<Maybe<QueryStarClustersConnectionEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QueryStarClustersConnectionEdge = {
  __typename?: 'QueryStarClustersConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<StarCluster>;
};

export type StarCluster = Node & {
  __typename?: 'StarCluster';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  planets?: Maybe<Array<PlanetStarCluster>>;
};

export type UpdatePlanetInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  starClusterIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateStarClusterInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type GetPlanetsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPlanetsQuery = {
  __typename?: 'Query';
  planets?: {
    __typename?: 'QueryPlanetsConnection';
    totalCount: number;
    edges?: Array<{
      __typename?: 'QueryPlanetsConnectionEdge';
      node?: { __typename?: 'Planet'; id: string; name?: string | null } | null;
    } | null> | null;
  } | null;
};

export const GetPlanetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getPlanets' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'planets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlanetsQuery, GetPlanetsQueryVariables>;
