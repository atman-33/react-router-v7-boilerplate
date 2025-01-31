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
      <div className="flex flex-col gap-4">
        <LinkButton
          to="/poc/sample-csr"
          label="Go to Sample CSR (Pokemon List)"
        />
        <LinkButton
          to="/poc/sample-ssr"
          label="Go to Sample SSR (Pokemon List)"
        />
        <LinkButton to="/poc/sample-ssg" label="Go to Sample SSG (About Me)" />
        <LinkButton
          to="/poc/sample-ssr-csr"
          label="Go to Sample SSR & CSR (Pokemon List)"
        />
        <LinkButton to="/poc/remix-tutorial" label="Remix Tutorial" />
      </div>
    </div>
  );
};

export default PocPage;
