import * as Sentry from "@sentry/react";
import { SimpleError } from "./Error/SimpleError";

export const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback?: JSX.Element }): JSX.Element => {
  const fallbackComponent = fallback || <SimpleError />;
  return <Sentry.ErrorBoundary fallback={fallbackComponent}>{children}</Sentry.ErrorBoundary>;
};
