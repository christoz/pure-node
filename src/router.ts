import type { IncomingMessage, ServerResponse } from "node:http";

type Handler = (req: IncomingMessage, res: ServerResponse) => void;

function createRouter() {
  const routes = new Map<string, Handler>();

  function get(path: string, handler: Handler) {
    routes.set(`GET:${path}`, handler);
  }

  function handle(req: IncomingMessage, res: ServerResponse) {
    const key = `${req.method}:${req.url}`;
    const handler = routes.get(key);

    if (handler) {
      return handler(req, res);
    }

    res.statusCode = 404;
    res.setHeader("Context-Type", "application/json");
    res.end(JSON.stringify({ error: "Route not found" }));
  }

  return {
    routes,
    get,
    handle,
  };
}

export { createRouter };
