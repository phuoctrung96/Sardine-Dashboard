import "react-app-polyfill/stable"; // Support browsers in browserslist https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./index.css";
import { SourceJumpOverlayPortal } from "tsx-source-jump";
import App from "./App";
import "./custom.scss";
import { StateProvider } from "./utils/store";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { UnhandledRejectionBoundary } from "./components/UnhandledRejectionBoundary";
import { GenericError } from "./components/Error/GenericError";

const environment = import.meta.env.VITE_APP_SARDINE_ENV;
Sentry.init({
  environment,
  dsn: "https://d66b99a9342c4640a17a4a1471664962@o438986.ingest.sentry.io/5709359",
  integrations: [new Integrations.BrowserTracing()],
});

const app = (
  <UnhandledRejectionBoundary>
    <ErrorBoundary fallback={<GenericError />}>
      <StateProvider>
        <SourceJumpOverlayPortal />
        <App />
      </StateProvider>
    </ErrorBoundary>
  </UnhandledRejectionBoundary>
);

ReactDOM.render(app, document.getElementById("root"));
