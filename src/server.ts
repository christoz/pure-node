import { createServer } from "node:http";
import { createRouter } from "./router.ts";

const router = createRouter();

const app = createServer((req, res) => {
  router.handle(req, res);
});

export { app, router };
