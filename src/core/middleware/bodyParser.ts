import type { IncomingMessage, ServerResponse } from "node:http";
import type { NextFunction } from "../types.ts";

function bodyParser(
  _req: IncomingMessage,
  _res: ServerResponse,
  next: NextFunction,
) {
  console.log("running body parser");
  next();
}

export { bodyParser };
