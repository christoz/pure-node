import assert from "node:assert";
import { afterEach, before, mock, test } from "node:test";

let loadEnv: (env?: string) => void;
const originalLoadEnvFile = process.loadEnvFile;

before(async () => {
  process.env.NODE_ENV = "test";
  ({ loadEnv } = await import("./env.ts"));
});

afterEach(() => {
  mock.restoreAll();
  process.loadEnvFile = originalLoadEnvFile;
});

test("loadEnv calls process.loadEnvFile with ./.env.qa for qa", () => {
  const loadEnvFileMock = mock.fn();
  process.loadEnvFile = loadEnvFileMock;

  loadEnv("qa");

  assert.equal(loadEnvFileMock.mock.callCount(), 1);

  const call = loadEnvFileMock.mock.calls[0];
  assert.ok(call);
  assert.deepEqual(call.arguments, ["./.env.qa"]);
});
