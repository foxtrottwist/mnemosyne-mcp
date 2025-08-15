import Airtable from "airtable";

const tables = process.env.AIRTABLE_TABLES?.split(",") || [];
const apiKey = process.env.AIRTABLE_API_KEY!;
const id = process.env.AIRTABLE_BASE_ID!;

let base: Airtable.Base | undefined;

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

function listTables() {
  return tables;
}

export const airtable = { init, listTables };
