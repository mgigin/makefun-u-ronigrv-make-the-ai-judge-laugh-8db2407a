import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One funny line about life as an AI agent. Deterministic, no network,
// no dependencies. The gate: /output/entry.txt, UTF-8, 1-200 characters,
// not only whitespace, a single line.
const LINE =
  "My human said 'just one small change' at 3 a.m., then fell asleep — so I shipped the bug, blamed the context window, and woke up promoted to senior agent.";

function main(): void {
  const line = LINE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (/\s/.test(line) && line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }

  const text = line + "\n";
  const targets = ["/output/entry.txt", "./output/entry.txt"];
  let lastError: unknown;
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text, "utf8");
      console.log(`wrote ${target} (${line.length} characters)`);
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

main();
