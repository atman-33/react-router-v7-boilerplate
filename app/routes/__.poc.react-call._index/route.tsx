import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';
import { AlertDialog } from '~/components/shared/react-call/alert-dialog';

const PocReactCallPage = () => {
  const [response, setResponse] = useState<string>();

  const handleButtonClick = async () => {
    const res = await AlertDialog.call({
      title: 'Sample',
      message: 'Cancel or Continue?',
    });
    setResponse(res);
  };

  return (
    <>
      <div className="container flex flex-col gap-4 p-8">
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
        <div>react-call sample</div>
        <Button
          onClick={async () => await handleButtonClick()}
          className="self-start"
        >
          Open dialog!
        </Button>
        <div>{`respose: ${response}`}</div>
      </div>
    </>
  );
};

export default PocReactCallPage;
