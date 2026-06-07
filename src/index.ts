import { env } from "./config/env.ts";
import { app } from "./server.ts";

const PORT = env.PORT;
const hostname = "localhost";

app.listen(PORT, hostname, function listeningListenter() {
  console.log(`listening on http://${hostname}:${PORT}`);
});
