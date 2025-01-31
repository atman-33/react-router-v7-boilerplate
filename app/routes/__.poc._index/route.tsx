import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';

const PocPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <Link to="/poc/sample-csr" className="flex justify-center">
          <Button className="w-80">Go to Sample CSR (Pokemon List)</Button>
        </Link>
        <Link to="/poc/sample-ssr" className="flex justify-center">
          <Button className="w-80">Go to Sample SSR (Pokemon List)</Button>
        </Link>
        <Link to="/poc/sample-ssg" className="flex justify-center">
          <Button className="w-80">Go to Sample SSG (About Me)</Button>
        </Link>
        <Link to="/poc/sample-ssr-csr" className="flex justify-center">
          <Button className="w-80">
            Go to Sample SSR & CSR (Pokemon List)
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PocPage;
