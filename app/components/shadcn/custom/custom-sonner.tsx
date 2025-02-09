import { useTheme } from 'next-themes';
import { type ExternalToast, Toaster as Sonner, toast } from 'sonner';

type CustomToasterProps = React.ComponentProps<typeof Sonner>;

const CustomToaster = ({ ...props }: CustomToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as CustomToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          // NOTE: !importantを付与しなければ画面に反映されない
          description: 'group-[.toast]:!text-muted-foreground',
          // NOTE: !importantを付与しなければ画面に反映されない
          actionButton:
            'group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground',
          // NOTE: !importantを付与しなければ画面に反映されない
          cancelButton:
            'group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground',
          info: 'group toast group-[.toaster]:border group-[.toaster]:border-gray-300 group-[.toaster]:bg-white group-[.toaster]:text-gray-600 group-[.toaster]:shadow-lg',
          success:
            'group toast group-[.toaster]:border group-[.toaster]:border-green-300 group-[.toaster]:bg-green-100 group-[.toaster]:text-green-600 group-[.toaster]:shadow-lg',
          warning:
            'group toast group-[.toaster]:border group-[.toaster]:border-yellow-300 group-[.toaster]:bg-yellow-100 group-[.toaster]:text-yellow-600 group-[.toaster]:shadow-lg',
          error:
            'group toast group-[.toaster]:border group-[.toaster]:border-red-300 group-[.toaster]:bg-red-100 group-[.toaster]:text-red-600 group-[.toaster]:shadow-lg',
        },
      }}
      {...props}
    />
  );
};

const toastInfo = (
  message: React.ReactNode | (() => React.ReactNode),
  data?: ExternalToast,
) => {
  toast.info(message, {
    duration: data?.duration ?? 2000,
    position: data?.position ?? 'bottom-center',
    ...data,
  });
};

const toastSuccess = (
  message: React.ReactNode | (() => React.ReactNode),
  data?: ExternalToast,
) => {
  toast.success(message, {
    duration: data?.duration ?? 2000,
    position: data?.position ?? 'bottom-center',
    ...data,
  });
};

const toastWarning = (
  message: React.ReactNode | (() => React.ReactNode),
  data?: ExternalToast,
) => {
  toast.warning(message, {
    duration: data?.duration ?? 2000,
    position: data?.position ?? 'bottom-center',
    ...data,
  });
};

const toastError = (
  message: React.ReactNode | (() => React.ReactNode),
  data?: ExternalToast,
) => {
  toast.error(message, {
    duration: data?.duration ?? 2000,
    position: data?.position ?? 'bottom-center',
    ...data,
  });
};

export { CustomToaster, toastError, toastInfo, toastSuccess, toastWarning };
