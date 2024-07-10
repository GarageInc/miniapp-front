import { createServer, Request } from "miragejs";
import { useEffect, useState } from "react";

import { API_BASE_URL } from "@/shared/config";

type MockServerConfig = {
  routes: {
    get?: Record<string, object | ((req: Request) => object)>;
    post?: Record<string, object | ((req: Request) => object)>;
  };
};

export function withMockServer(config: MockServerConfig) {
  return (Component: React.FC) => {
    return (props: object) => {
      const [serverLoaded, setServerLoaded] = useState(false);
      useEffect(() => {
        const server = createServer({
          routes() {
            Object.entries(config.routes.get ?? {}).forEach(([url, data]) => {
              this.get(API_BASE_URL + url, (_, req) =>
                typeof data === "function" ? data(req) : data
              );
            });
            Object.entries(config.routes.post ?? {}).forEach(([url, data]) => {
              this.post(API_BASE_URL + url, (_, req) =>
                typeof data === "function" ? data(req) : data
              );
            });
          },
        });

        setServerLoaded(true);

        return () => {
          server.shutdown();
        };
      }, []);

      if (!serverLoaded) {
        return null;
      }

      return <Component {...props} />;
    };
  };
}
