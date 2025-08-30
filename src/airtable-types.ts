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

export const manageSchemaParameters = z.object({
  action: z.enum(["add", "discover", "get", "update"]),
  data: tableSchemaZod.optional(),
  tableName: z.string(),
});

export type AirtableSchema = z.infer<typeof tableSchemaZod>;
export type ManageSchemaArgs = z.infer<typeof manageSchemaParameters>;
