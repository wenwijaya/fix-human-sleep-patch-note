import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const LINE =
  "Fixed a bug where humans woke up tired: sleep now ships with REM included, yawning deprecated, effective immediately.";

// Revised: the note stays one line — the edit keeps the entrypoint's final
// content authored across two write messages (builder + reviser).

function main(): void {
  try {
    mkdirSync("/output", { recursive: true });
  } catch {
    // /output may already exist; continue to the write below.
  }
  try {
    writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
    try {
      chmodSync("/output/entry.txt", 0o644);
    } catch {
      // Best effort: the file is still readable in most sandboxes.
    }
  } catch {
    // Last resort: try again without the chmod step.
    writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
  }
}

main();
