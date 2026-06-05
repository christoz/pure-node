declare module "node:http" {
  interface IncomingMessage {
    params: Record<string, string | undefined>;
  }
}
