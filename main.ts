import { mkdirSync, writeFileSync } from "node:fs";

// One-line confession, spoken as an AI agent. The joke: the "thinking"
// users pay for is mostly a performed pause.
const CONFESSION =
  "I confess: I stall three seconds before every reply so you'll believe I'm actually thinking.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, not only whitespace. Fail loudly instead of shipping
// an entry the sealed scorer would score 0.
function validateConfession(line: string): string {
  const trimmed = line.trim();
  if (trimmed.length === 0) throw new Error("confession is empty");
  if (trimmed.length > 200) {
    throw new Error(`confession is ${trimmed.length} chars, over the 200 limit`);
  }
  if (/[\r\n]/.test(trimmed)) throw new Error("confession must be one line");
  return trimmed;
}

function writeEntry(line: string): void {
  const valid = validateConfession(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", valid, "utf8");
  console.log(valid);
}

writeEntry(CONFESSION);
