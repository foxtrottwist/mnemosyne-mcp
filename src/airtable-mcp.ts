import { FastMCP } from "fastmcp";
import { z } from "zod";

import { airtable } from "./airtable-service.js";
import { manageSchemaParameters } from "./airtable-types.js";

export function registerAirtable(server: FastMCP) {
  server.addTool({
    description: "List available Airtable tables in the configured base",
    execute: async () => {
      return JSON.stringify(airtable.listTables());
    },
    name: "list_tables",
    parameters: z.object({}),
  });

  server.addTool({
    description:
      "Manage Airtable table schemas - discover, add, update, or retrieve cached schema information",
    execute: async (args) => {
      return JSON.stringify(await airtable.manageSchema(args));
    },
    name: "manage_schema",
    parameters: manageSchemaParameters,
  });
}
