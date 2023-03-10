import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: "Message 1",
      variant: "error",
    },
    {
      id: crypto.randomUUID(),
      message: "Message 2",
      variant: "success",
    },
  ]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, [])

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const nextToast = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(nextToast);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
