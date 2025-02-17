import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Welcome } from './components/welcome/welcome';

export default function AppPage() {
  return (
    <>
      <Welcome />
      <div className="flex justify-center">
        <div className="flex flex-col gap-4">
          <Link to="/demo" className="flex justify-center">
            <Button className="px-8">Demo</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
