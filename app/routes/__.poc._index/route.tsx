import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';

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
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>

        <LinkButton to="/poc/sample/csr" label="Sample CSR (Pokemon List)" />
        <LinkButton to="/poc/sample/ssr" label="Sample SSR (Pokemon List)" />
        <LinkButton to="/poc/sample/ssg" label="Go to Sample SSG (About Me)" />
        <LinkButton
          to="/poc/sample/ssr-csr"
          label="Sample SSR & CSR (Pokemon List)"
        />
        <LinkButton to="/poc/remix-tutorial" label="Remix Tutorial" />
      </div>
    </div>
  );
};

export default PocPage;
