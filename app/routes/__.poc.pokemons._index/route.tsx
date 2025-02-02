import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/shadcn/ui/card';

const RemixTutorialTopPage = () => {
  const pokemons = [
    {
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
    },
    {
      name: 'charmander',
      height: 6,
      weight: 85,
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      },
    },
    {
      name: 'squirtle',
      height: 5,
      weight: 90,
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-2xl">Welcome to the Pokemon App</h1>
      <p className="text-lg">Explore the world of Pokemon with PokeAPI</p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name}>
            <CardHeader>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <CardDescription>Height: {pokemon.height}</CardDescription>
              <CardDescription>Weight: {pokemon.weight}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-4">
        Data sourced from{' '}
        <a
          href="https://pokeapi.co/"
          className="text-blue-500 underline"
          target="_blank"
          rel="noreferrer"
        >
          PokeAPI
        </a>
        .
      </p>
    </div>
  );
};

export default RemixTutorialTopPage;
