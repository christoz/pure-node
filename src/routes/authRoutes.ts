import { createRouter } from "../router.ts";

const authRouter = createRouter();

authRouter.post("/register", function registerRoute(_req, res) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 201;
  res.write(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),
  );
});

export { authRouter };
