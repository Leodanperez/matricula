import { toast } from "react-toastify";

interface ToastOptions {
  message: string;
  type: "success" | "error" | "info" | "warning";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

const showToast = ({
  message,
  type,
  position = "top-center",
}: ToastOptions) => {
  toast[type](message, {
    position,
  });
};

export default showToast;
