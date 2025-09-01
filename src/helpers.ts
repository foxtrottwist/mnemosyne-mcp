import { readFileSync } from "fs";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { AirtableSchema } from "./airtable-types.js";
import { logger } from "./logger.js";

const DATA_DIRECTORY = `${process.env.HOME}/.mnemosyne-mcp/`;
const SCHEMAS = `${DATA_DIRECTORY}schemas/`;

export async function ensureDataDirectory() {
  try {
    await mkdir(DATA_DIRECTORY, { recursive: true });
    await mkdir(SCHEMAS, { recursive: true });

    logger.info("Data directory initialized");
  } catch (error) {
    logger.error({ error: String(error) }, "Failed to create data directory");
    throw error;
  }
}

export function getVersion() {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const packagePath = join(__dirname, "../package.json");
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    return packageJson.version;
  } catch {
    return "unknown";
  }
}
/**
 * Checks if a path is a file.
 *
 * @param path - The path to check
 * @returns True if path is a file, false otherwise
 */
export async function isFile(path: string) {
  return stat(path)
    .then((res) => res.isFile())
    .catch(() => false);
}

export async function load<T = unknown>(filePath: string, defaultValue: T) {
  if (await isFile(filePath)) {
    const file = await readFile(filePath, "utf8");

    try {
      return JSON.parse(file) as T;
    } catch (error) {
      logger.error(
        { error: String(error), path: filePath },
        "JSON file corrupted",
      );
      throw new Error(`File at ${filePath} corrupted - please reset`);
    }
  }

  await ensureDataDirectory();
  return defaultValue;
}
/**
 * Safely attempts to parse a JSON string with error handling.
 *
 * @param s - The string to parse as JSON
 * @param handleError - Callback function to handle parse errors
 * @returns Parsed JSON object if successful, undefined if parsing fails
 *
 * @example
 * ```typescript
 * const data = tryJSONParse('{"key": "value"}', (e) => console.error(e));
 * // Returns: { key: "value" }
 *
 * const invalid = tryJSONParse('invalid json', (e) => console.error(e));
 * // Returns: undefined (and logs error)
 * ```
 */
export function tryJSONParse(s: string, handleError: (e: unknown) => void) {
  try {
    return JSON.parse(s) ?? undefined;
  } catch (e) {
    handleError(e);
  }
}

export async function writeSchema(name: string, data: AirtableSchema) {
  try {
    await writeFile(`${SCHEMAS}${name}.json`, JSON.stringify(data));
  } catch (error) {
    throw new Error(`Failed to save schema ${name}: ${String(error)}`);
  }
}
