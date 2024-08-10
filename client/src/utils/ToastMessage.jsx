import { toast } from "react-toastify";

export const createToastMessage = (message, messageType = 0) => {
  switch (messageType) {
    // 1 success
    case 1:
      return toast.success(message);
    // 2 info
    case 2:
      return toast.info(message);
    // 3 warning
    case 3:
      return toast.warning(message);
    // 4 error
    case 4:
      return toast.error(message);
    default:
      return toast(message);
  }
};
