import { toast as reactToast, ToastOptions, TypeOptions } from 'react-toastify';

type DefaultToast = (
  text: string,
  options?: ToastOptions,
  type?: TypeOptions,
) => void;

type Toast = {
  success: (text: string, options?: ToastOptions) => void;
  error: (text: string, options?: ToastOptions) => void;
} & DefaultToast;

const defaultOptions: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'colored',
  position: 'top-right',
};

const toast: Toast = ((text, options, type) => {
  const toastText = text?.replace?.(/<br\s*\/>/g, '\n') || text;

  const toastId = toastText;

  const optionData = {
    ...defaultOptions,
    ...options,
    toastId,
    updateId: toastId,
  };

  if (options?.onClick) {
    optionData.style = { cursor: 'pointer' };
  }

  switch (type) {
    case 'success':
      reactToast.success(toastText, optionData);
      break;
    case 'error':
      reactToast.error(toastText, optionData);
      break;
    case 'default':
    default:
      reactToast(toastText, optionData);
      break;
  }
}) as Toast;

toast.success = (text, options) => {
  toast(text, options, 'success');
};
toast.error = (text, options) => {
  toast(text, options, 'error');
};

export default toast;
