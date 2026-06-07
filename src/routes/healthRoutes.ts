import { env } from "../config/env.ts";
import { createRouter } from "../router.ts";

const healthRouter = createRouter();

healthRouter.get("/status", function healthStatusHandler(_req, res) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "Habit Tracker API",
      environment: env.APP_ENV,
      nodeEnv: env.NODE_ENV,
    }),
  );
});

export { healthRouter };
