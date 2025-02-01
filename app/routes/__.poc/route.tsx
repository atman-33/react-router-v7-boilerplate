import { Link, Outlet } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';

const PocLayout = () => {
  return (
    <>
      <div className="my-4 mr-4 flex justify-end">
        <Link to="/">
          <Button variant="secondary">Go to Home</Button>
        </Link>
      </div>
      <Separator />
      <Outlet />
    </>
  );
};

export default PocLayout;
