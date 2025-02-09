import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';

const LinkButton = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link to={to} className="flex justify-center">
      <Button className="w-80">{label}</Button>
    </Link>
  );
};

const PocPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <LinkButton to="/poc/sample-csr" label="Sample CSR" />
        <LinkButton to="/poc/sample-ssr" label="Sample SSR" />
        <LinkButton to="/poc/sample-ssg" label="Sample SSG" />
        <LinkButton to="/poc/sample-ssr-csr" label="Sample SSR & CSR" />
        <Separator />
        <LinkButton to="/poc/conform" label="conform" />
        <LinkButton to="/poc/react-call" label="react-call" />
        <Separator />
        <LinkButton to="/poc/pokemons" label="Pokemon App" />
        <LinkButton to="/poc/contacts" label="Remix Tutorial" />
      </div>
    </div>
  );
};

export default PocPage;
