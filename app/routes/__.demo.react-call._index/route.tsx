import { useState } from 'react';
import { Button } from '~/components/shadcn/ui/button';
import { AlertDialog } from '~/components/shared/react-call/alert-dialog';

const DemoReactCallPage = () => {
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

export default DemoReactCallPage;
