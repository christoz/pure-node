import { createServer, type Server } from "node:http";
import { createRouter } from "./router.ts";
import type { Middleware } from "./types.ts";

interface App {
  listen: (port: number, hostname: string, callback?: () => void) => Server;
  use: {
    (middleware: Middleware): void;
    (prefix: string, childRouter: ReturnType<typeof createRouter>): void;
  };
}

const router = createRouter();
const middlewares: Middleware[] = [];

function createApp(): App {
  const app: App = {
    listen(port, hostname, callback) {
      const server = createServer(function requestListener(req, res) {
        let i = 0;

        function next(err?: unknown) {
          if (err) {
            res.writeHead(403, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
            return;
          }
          const mw = middlewares[i++];
          if (mw) {
            mw(req, res, next);
          } else {
            router.handle(req, res);
          }
        }


        next();
      });

      server.listen(port, hostname, callback);

      return server;
    },

    use(
      arg: string | Middleware,
      maybeRouter?: ReturnType<typeof createRouter>,
    ) {
      if (typeof arg === "string") {
        router.use(arg, maybeRouter as ReturnType<typeof createRouter>);
      } else {
        middlewares.push(arg);
      }
    },
  };

  return app;
}

export { createApp };
