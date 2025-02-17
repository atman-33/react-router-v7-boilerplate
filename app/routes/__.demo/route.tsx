import { Link, Outlet } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';

const DemoLayout = () => {
  return (
    <>
      <div className="my-4 mr-4 flex justify-center gap-4">
        <Link to="/">
          <Button variant="secondary" className="w-20">
            Home
          </Button>
        </Link>
        <Link to="/demo">
          <Button variant="secondary" className="w-20">
            Demo
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};

export default DemoLayout;
