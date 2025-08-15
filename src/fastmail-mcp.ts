import { FastMCP } from "fastmcp";
import { z } from "zod";

import { fastmail } from "./fastmail-service.js";

export function registerFastMail(server: FastMCP) {
  server.addTool({
    description: "List sender identities",
    execute: async (_, { log }) => {
      return JSON.stringify(await fastmail.listIdentities().catch(log.error));
    },
    name: "list_identities",
    parameters: z.object({}),
  });
}
