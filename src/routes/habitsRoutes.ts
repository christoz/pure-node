import { createRouter } from "../core/router.ts";

const habitsRouter = createRouter();

habitsRouter.get("/", function getAll(_req, res) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: "users",
    }),
  );
});

habitsRouter.get<{ id: string; userId: string }>(
  "/posts/:id/:userId",
  function postHandler(_req, res) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    res.end(
      JSON.stringify({
        status: "ok",
        timestamp: new Date().toISOString(),
      }),
    );
  },
);

export { habitsRouter };
