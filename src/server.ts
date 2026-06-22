import { createServer, type Server } from "node:http";
import { createRouter } from "./router.ts";
import { authRouter, habitsRouter, healthRouter } from "./routes/index.ts";

interface App {
  listen: (port: number, hostname: string, callback?: () => void) => Server;
}

const router = createRouter();

router.use("/api/auth", authRouter);
router.use("/api/health", healthRouter);
router.use("/api/habits", habitsRouter);

function createApp(): App {
  const app: App = {
    listen(port, hostname, callback) {
      const server = createServer(function requestListenter(req, res) {
        router.handle(req, res);
      });

      server.listen(port, hostname, callback);

      return server;
    },
  };

  return app;
}

const app = createApp();

export { app };
