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
        <LinkButton to="/poc/contacts" label="Remix Tutorial" />
        <Separator />
        <LinkButton to="/poc/conform" label="conform" />
        <LinkButton to="/poc/react-call" label="react-call" />
        <LinkButton to="/poc/sonner" label="sonner" />
      </div>
    </div>
  );
};

export default PocPage;
