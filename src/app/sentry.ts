import React from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import * as Sentry from "@sentry/react";

import { IS_DEV, SENTRY_DSN } from "@/shared/config";

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  environment: IS_DEV ? "development" : "production",
  tracesSampleRate: 1.0,
});
