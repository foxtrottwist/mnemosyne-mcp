import Airtable from "airtable";

import { ManageSchemaArgs } from "./airtable-types.js";

const tables = process.env.AIRTABLE_TABLES?.split(",") || [];
const apiKey = process.env.AIRTABLE_API_KEY!;
const id = process.env.AIRTABLE_BASE_ID!;

let base: Airtable.Base | undefined;

async function createRecord() {
  await validateRecord();
}

async function deleteRecord() {}

async function getRecord() {}

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

async function listRecords() {}

function listTables() {
  return tables;
}

async function manageSchema({ action }: ManageSchemaArgs) {
  switch (action) {
    case "add":
    case "discover":
    case "get":
    case "update":
    default:
      break;
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
