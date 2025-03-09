import { graphql } from '~/.server/lib/graphql/@generated';
import {
  getOriginalErrorMessage,
  initializeClient,
} from '~/lib/graphql-client';
import type { Route } from './+types/route';

const getPlanets = graphql(`
query getPlanets {
  planets {
    edges {
      node {
        id
        name
      }
    }
    totalCount
  }
}
`);

export const loader = async ({ request }: Route.LoaderArgs) => {
  const client = await initializeClient(request);
  return await client
    .request(getPlanets)
    .then((planets) => planets)
    .catch((error) => {
      console.log(error);
      const errorMessage = getOriginalErrorMessage(error);
      return { errorMessage: errorMessage ?? (error.message as string) };
    });
};

const DemoGraphqlPage = ({ loaderData }: Route.ComponentProps) => {
  if ('errorMessage' in loaderData) {
    return <div>{loaderData.errorMessage}</div>;
  }

  const planets = loaderData.planets?.edges;

  return (
    <>
      <div>
        <h2>A list of planets</h2>
        <ul>
          {planets?.map((planet) => (
            <li key={planet?.node?.id}>
              {planet?.node?.id} 👉 {planet?.node?.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DemoGraphqlPage;
