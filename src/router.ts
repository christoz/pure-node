import type { IncomingMessage, ServerResponse } from "node:http";
import type { Params, RouteHandler } from "./types.ts";

type Route = { handler: RouteHandler; pattern: URLPattern };

function createRouter() {
  const routes = new Map<string, Route>();

  function use(prefix: string, childRouter: ReturnType<typeof createRouter>) {
    for (const [key, route] of childRouter.routes) {
      const colonIndex = key.indexOf(":");
      const method = key.slice(0, colonIndex);
      const path = key.slice(colonIndex + 1);
      const fullPath = path === "/" ? prefix : prefix + path;
      const pattern = new URLPattern({ pathname: fullPath });
      routes.set(`${method}:${fullPath}`, { pattern, handler: route.handler });
    }
  }

  function get<P extends Params>(path: string, handler: RouteHandler<P>) {
    const pattern = new URLPattern({ pathname: path });
    routes.set(`GET:${path}`, { pattern, handler: handler as RouteHandler });
  }

  function post<P extends Params>(path: string, handler: RouteHandler<P>) {
    const pattern = new URLPattern({ pathname: path });
    routes.set(`POST:${path}`, { pattern, handler: handler as RouteHandler });
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

  return { routes, get, post, handle, use };
}

export { createRouter };
