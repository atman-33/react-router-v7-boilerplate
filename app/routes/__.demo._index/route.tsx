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

const DemoPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <LinkButton to="/auth/login" label="Authentication" />
        <LinkButton to="/demo/contacts" label="React Router Tutorial" />
        <Separator />
        <LinkButton to="/demo/conform" label="conform" />
        <LinkButton to="/demo/react-call" label="react-call" />
        <LinkButton to="/demo/sonner" label="sonner" />
        <Separator />
        <LinkButton to="/demo/graphql" label="graphql" />
      </div>
    </div>
  );
};

export default DemoPage;
