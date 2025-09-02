import Airtable from "airtable";
import { writeFile } from "fs/promises";

import {
  BaseRecordArgs,
  ListRecordsArgs,
  ManageSchemaArgs,
} from "./airtable-types.js";
import { load, sanitizeFilename, SCHEMAS_DIRECTORY } from "./helpers.js";

const tables = process.env.AIRTABLE_TABLES?.split(",") || [];
const apiKey = process.env.AIRTABLE_API_KEY!;
const id = process.env.AIRTABLE_BASE_ID!;

let base: Airtable.Base | undefined;

async function createRecord() {
  await validateRecord();
}

async function deleteRecord({ id, tableName }: BaseRecordArgs) {
  return await base?.table(tableName).destroy(id);
}

async function getRecord({ id, tableName }: BaseRecordArgs) {
  return await base?.table(tableName).find(id);
}

async function init() {
  if (base) {
    return;
  }

  if (!apiKey || !id) {
    return;
  }

  Airtable.configure({ apiKey });
  base = Airtable.base(id);
}

async function listRecords(args: ListRecordsArgs) {
  const { tableName, ...options } = args;
  return await base?.table(tableName).select(options).all();
}

function listTables() {
  return tables;
}

async function manageSchema({ action, data, tableName }: ManageSchemaArgs) {
  const filePath = `${SCHEMAS_DIRECTORY}${sanitizeFilename(tableName)}.json`;

  switch (action) {
    case "add":
    case "update": {
      try {
        await writeFile(filePath, JSON.stringify(data));
        return `Succuessful ${action}ed schema ${tableName}`;
      } catch (error) {
        throw new Error(`Failed to save schema ${filePath}: ${String(error)}`);
      }
    }
    case "discover":
    case "get": {
      return JSON.stringify(await load(filePath, {}));
    }
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
}

async function updateRecord() {
  await validateRecord();
}

async function validateRecord() {}

export const airtable = {
  createRecord,
  deleteRecord,
  getRecord,
  init,
  listRecords,
  listTables,
  manageSchema,
  updateRecord,
};
