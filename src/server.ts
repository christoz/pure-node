import { createServer } from "node:http";
import { createRouter } from "./router.ts";

const router = createRouter();

const app = createServer(function requestListenter(req, res) {
  router.handle(req, res);
});

export { app, router };
