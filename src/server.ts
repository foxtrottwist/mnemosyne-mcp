import { FastMCP } from "fastmcp";

import { fastmail } from "./fastmail/service.js";
import { registerFastMailTools } from "./fastmail/tools.js";
import { getVersion } from "./helpers.js";
import { logger } from "./logger.js";

const server = new FastMCP({
  name: "Mnemosyne",
  version: getVersion(),
});

registerFastMailTools(server);

server.start({
  transportType: "stdio",
});

server.on("connect", async () => {
  await fastmail.init().catch(logger.error);
});
