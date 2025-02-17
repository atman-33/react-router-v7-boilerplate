import { toast } from 'sonner';
import { showToast } from '~/components/shadcn/custom/custom-sonner';
import { Button } from '~/components/shadcn/ui/button';

const DemoToastPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast(
            'Information',
            {
              description: 'This is an informational message',
              action: {
                label: 'Got it',
                onClick: () => console.log('Got it'),
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            },
            'info',
          )
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast(
            'Event created successfully',
            {
              description: 'Your event has been created',
              action: {
                label: 'View',
                onClick: () => console.log('View'),
              },
            },
            'success',
          )
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast(
            'Warning',
            {
              description: 'This action is irreversible',
              action: {
                label: 'Proceed',
                onClick: () => console.log('Proceed'),
              },
            },
            'warning',
          )
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast(
            'An error occurred',
            {
              description: 'Unable to create event',
              action: {
                label: 'Retry',
                onClick: () => console.log('Retry'),
              },
            },
            'error',
          )
        }
      >
        Error
      </Button>
    </div>
  );
};

export default DemoToastPage;
