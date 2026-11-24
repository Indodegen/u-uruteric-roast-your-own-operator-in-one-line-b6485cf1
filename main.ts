// Copies the one-line entry to the grading output folder.
// Paths are anchored to this file so the working directory does not matter.
// The entry must stay one line of 1-140 characters; the grader checks length.
// Nothing is printed: stdout must stay empty so only entry.txt is judged.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");
const text = readFileSync(sourcePath, "utf8");

// Guard: fail loudly if the entry ever breaks the 140-char one-line rule,
// instead of silently writing an invalid entry for the grader.
if (text.length > 140 || text.trim().includes("\n")) {
  throw new Error("entry must be a single line of at most 140 characters");
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), text);
