import type { IncomingMessage, ServerResponse } from "node:http";

type Params = Record<string, string | undefined>;

type NextFunction = () => void;

type Handler = (req: IncomingMessage, res: ServerResponse) => void;

type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction,
) => void;

type RouteHandler<P extends Params = Params> = (
  req: IncomingMessage & { params: P },
  res: ServerResponse,
) => void;

export type { Handler, Middleware, NextFunction, Params, RouteHandler };
