import type { IncomingMessage, ServerResponse } from "node:http";

type Params = Record<string, string | undefined>;
type Handler<P extends Params = Params> = (
  req: IncomingMessage & { params: P },
  res: ServerResponse,
) => void;

type Route = { handler: Handler; pattern: URLPattern };

function createRouter() {
  const routes = new Map<string, Route>();

  function get<P extends Params>(path: string, handler: Handler<P>) {
    const pattern = new URLPattern({ pathname: path });
    routes.set(`GET:${path}`, { pattern, handler: handler as Handler });
  }

  function handle(req: IncomingMessage, res: ServerResponse) {
    const method = req.method ?? "GET";
    const pathname = req.url ?? "/";

    for (const [key, { pattern, handler }] of routes) {
      if (!key.startsWith(method)) continue;

      const match = pattern.exec({ pathname });
      if (match) {
        req.params = match.pathname.groups;
        return handler(req, res);
      }
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Route not found" }));
  }

  return { routes, get, handle };
}

export { createRouter };
