import { createRouter } from "../router.ts";

const userRouter = createRouter();

userRouter.get<{ id: string; userId: string }>(
  "/posts/:id/:userId",
  function postHandler(_req, res) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    res.write(
      JSON.stringify({
        status: "ok",
        timestamp: new Date().toISOString(),
      }),
    );
  },
);

export { userRouter };
