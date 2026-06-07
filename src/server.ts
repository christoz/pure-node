import { createServer } from "node:http";
import { createRouter } from "./router.ts";
import { authRouter, healthRouter, userRouter } from "./routes/index.ts";

const router = createRouter();

router.use("/auth", authRouter);
router.use("/health", healthRouter);
router.use("/user", userRouter);

const app = createServer(function requestListenter(req, res) {
  router.handle(req, res);
});

export { app, router };
