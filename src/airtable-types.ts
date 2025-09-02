import { z } from "zod";

const airtableFieldTypes = z.enum([
  "singleLineText",
  "multilineText",
  "richText",
  "email",
  "url",
  "phoneNumber",
  "number",
  "percent",
  "currency",
  "singleSelect",
  "multipleSelects",
  "checkbox",
  "date",
  "dateTime",
  "duration",
  "rating",
  "multipleAttachments",
  "multipleRecordLinks",
  "multipleCollaborators",
  "singleCollaborator",
  "barcode",
  "autoNumber",
  "formula",
  "rollup",
  "count",
  "createdTime",
  "lastModifiedTime",
  "createdBy",
  "lastModifiedBy",
]);

const tableSchemaZod = z.object({
  fields: z.record(
    z.object({
      allowedValues: z.array(z.string()).optional(),
      linkedTable: z.string().optional(),
      pattern: z.string().optional(),
      required: z.boolean(),
      type: airtableFieldTypes,
    }),
  ),
  lastUpdated: z.string().datetime(),
});

export const manageSchemaParameters = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("add"),
    data: tableSchemaZod,
    tableName: z.string(),
  }),
  z.object({
    action: z.literal("update"),
    data: tableSchemaZod,
    tableName: z.string(),
  }),
  z.object({
    action: z.literal("get"),
    data: z.undefined(),
    tableName: z.string(),
  }),
  z.object({
    action: z.literal("discover"),
    data: z.undefined(),
    tableName: z.string(),
  }),
]);

export const listRecordsParameters = z.object({
  maxRecords: z.number().optional(),
  tableName: z.string(),
});

export const recordParameters = z.object({
  id: z.string(),
  tableName: z.string(),
});

export type AirtableSchema = z.infer<typeof tableSchemaZod>;
export type BaseRecordArgs = z.infer<typeof recordParameters>;
export type ListRecordsArgs = z.infer<typeof listRecordsParameters>;
export type ManageSchemaArgs = z.infer<typeof manageSchemaParameters>;
