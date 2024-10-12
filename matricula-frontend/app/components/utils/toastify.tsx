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
  theme?: "light" | "dark" | "colored";
}

const showToast = ({
  message,
  type,
  position = "top-center",
  theme = "colored",
}: ToastOptions) => {
  toast[type](message, {
    position,
    theme,
  });
};

export default showToast;
