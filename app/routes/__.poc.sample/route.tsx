import { Link, Outlet } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';

const PocLayout = () => {
  return (
    <>
      <div className="my-4 mr-4 flex justify-center gap-4">
        <Link to="/">
          <Button variant="secondary" className="w-20">
            Home
          </Button>
        </Link>
        <Link to="/poc">
          <Button variant="secondary" className="w-20">
            PoC
          </Button>
        </Link>
      </div>
      <Separator />
      <Outlet />
    </>
  );
};

export default PocLayout;
