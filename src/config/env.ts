import { z } from "zod";

function loadEnv(env = "prod") {
  try {
    if (env === "prod") {
      return process.loadEnvFile("./.env");
    }
    process.loadEnvFile(`./.env.${env}`);
  } catch (error) {
    console.error(error);
  }
}

process.env.APP_ENV = process.env.APP_ENV || "dev";

loadEnv(process.env.APP_ENV);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  APP_ENV: z.enum(["dev", "qa", "prod"]).default("dev"),
  PORT: z.coerce.number().positive().default(3000),
});

export type Env = z.infer<typeof envSchema>;
let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.log("Invalid env var");
    console.log(JSON.stringify(z.flattenError(e).fieldErrors, null, 2));

    e.issues.forEach((err) => {
      const path = err.path.join(".");
      console.log(`${path}: ${err.message}`);
    });

    process.exit(1);
  }

  throw e;
}

export const isProd = () => env.APP_ENV === "prod";
export const isQA = () => env.APP_ENV === "qa";
export const isDev = () => env.APP_ENV === "dev";

export { env, loadEnv };
