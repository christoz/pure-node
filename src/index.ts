import { env } from "./config/env.ts";
import { app, router } from "./server.ts";

const PORT = env.PORT;
const hostname = "localhost";

router.get("/health/status", function healthStatusHandler(_req, res) {
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

app.listen(PORT, hostname, function listeningListenter() {
  console.log(`listening on http://${hostname}:${PORT}`);
});
