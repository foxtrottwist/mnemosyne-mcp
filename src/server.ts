import { FastMCP } from "fastmcp";

import { registerAirtable } from "./airtable-mcp.js";
import { airtable } from "./airtable-service.js";
import { registerFastMail } from "./fastmail-mcp.js";
import { fastmail } from "./fastmail-service.js";
import { getVersion } from "./helpers.js";
import { logger } from "./logger.js";

const server = new FastMCP({
  name: "Mnemosyne",
  version: getVersion(),
});

registerAirtable(server);
registerFastMail(server);

server.start({
  transportType: "stdio",
});

server.on("connect", async () => {
  await fastmail.init().catch(logger.error);
  await airtable.init().catch(logger.error);
});
