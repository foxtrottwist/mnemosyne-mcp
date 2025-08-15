import { FastMCP } from "fastmcp";
import { z } from "zod";

import { airtable } from "./airtable-service.js";

export function registerAirtable(server: FastMCP) {
  server.addTool({
    description: "List available Airtable tables in the configured base",
    execute: async () => {
      return JSON.stringify(airtable.listTables());
    },
    name: "list_tables",
    parameters: z.object({}),
  });
}
