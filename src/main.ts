import { getServer } from "./mcp-server.ts";

if (import.meta.main) {
  const server = getServer();

  server.start({
    transportType: "httpStream",
    httpStream: {
      port: 8000,
    },
  });
}
