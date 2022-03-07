import { useEffect } from "react";
import { captureException } from "../utils/errorUtils";

export const UnhandledRejectionBoundary = ({ children }: { children: React.ReactElement }): React.ReactElement => {
  const onPromiseRejection = (e: PromiseRejectionEvent) => {
    captureException(e.reason);
  };
  useEffect(() => {
    window.addEventListener("unhandledrejection", onPromiseRejection);
    return () => {
      window.removeEventListener("unhandledrejection", onPromiseRejection);
    };
  }, []);

  return children;
};
