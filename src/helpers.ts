import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

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
