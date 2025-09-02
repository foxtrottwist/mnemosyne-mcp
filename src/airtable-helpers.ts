import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { AirtableSchema } from "./airtable-types.js";
import { DATA_DIRECTORY, load } from "./helpers.js";

export async function getSchema(name: string) {
  return await load(`${SCHEMAS}${name}`, {});
}

export async function writeSchema(name: string, data: AirtableSchema) {}
