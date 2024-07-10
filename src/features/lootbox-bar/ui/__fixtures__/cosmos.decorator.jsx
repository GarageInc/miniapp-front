import { AppProviders } from "@/app/providers";

export default ({ children }) => (
  <AppProviders>
    <div className="h-screen overflow-y-auto">{children}</div>
  </AppProviders>
);
