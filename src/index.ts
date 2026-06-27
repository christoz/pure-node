
import { createApp } from "./core/server.ts";
import { env } from "./config/env.ts";
import { authRouter, habitsRouter, healthRouter } from "./routes/index.ts";
import cors from 'cors'
import { corsOptions } from "./config/cors.ts";
import morgan from 'morgan'
import helmet from "helmet";


const PORT = env.PORT;
const hostname = "localhost";
const app = createApp();

app.use(helmet())
app.use(morgan('dev'));
app.use(cors(corsOptions))

app.use("/api/auth", authRouter);
app.use("/api/health", healthRouter);
app.use("/api/habits", habitsRouter);

app.listen(PORT, hostname, function listeningListener() {
  console.log(`listening on http://${hostname}:${PORT}`);
});
