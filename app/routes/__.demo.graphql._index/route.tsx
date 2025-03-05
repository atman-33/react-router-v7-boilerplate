import { graphql } from '~/.server/lib/graphql/@generated';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/shadcn/ui/table';
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
      <Table>
        <TableCaption>A list of planets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planets?.map((planet) => (
            <TableRow key={planet?.node?.id}>
              <TableCell>{planet?.node?.id}</TableCell>
              <TableCell>{planet?.node?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DemoGraphqlPage;
