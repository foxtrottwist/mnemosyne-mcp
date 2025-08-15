import { FastMCP } from "fastmcp";
import { z } from "zod";

import { fastmail } from "./service.js";

export function registerFastMailTools(server: FastMCP) {
  server.addTool({
    description: "List sender identities",
    execute: async (_, { log }) => {
      return JSON.stringify(await fastmail.getIdentities().catch(log.error));
    },
    name: "list_identities",
    parameters: z.object({}),
  });
}
