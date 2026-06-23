import { env } from "./config/env.ts";
import { logger } from "./middleware/logger.ts";
import { authRouter, habitsRouter, healthRouter } from "./routes/index.ts";
import { createApp } from "./server.ts";

const PORT = env.PORT;
const hostname = "localhost";

const app = createApp();

app.use(logger);
app.use("/api/auth", authRouter);
app.use("/api/health", healthRouter);
app.use("/api/habits", habitsRouter);

app.listen(PORT, hostname, function listeningListener() {
  console.log(`listening on http://${hostname}:${PORT}`);
});
