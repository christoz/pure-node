import { app, router } from "./server.ts";

const PORT = 3000;
const hostname = "localhost";

router.get("/health", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "Habit Tracker API",
    }),
  );
});

app.listen(PORT, hostname, () => {
  console.log(`listening on http://${hostname}:${PORT}`);
});
