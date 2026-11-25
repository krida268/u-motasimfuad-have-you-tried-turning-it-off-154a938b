// Have You Tried Turning It Off? — make.fun entry.
// Writes one funny line a hopeless tech support agent says to a
// desperate customer, to /output/entry.txt (or the path in argv[2]).
// The joke: the classic "turn it off and on again" did work — on the
// wrong machine. The agent is cheerfully useless; the customer is
// never the butt of it. The twist lands because the support agent
// opens with good news ("Great news") and only then admits the
// reboot hit the customer's computer instead of the printer — the
// exact kind of confident blunder a hopeless agent would report
// proudly. Gate: 1-199 characters, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "Great news: turning it off and on again worked. Less great news: I turned off your computer, not the printer.";

function main(): void {
  const target = process.argv[2] ? resolve(process.argv[2]) : "/output/entry.txt";
  const outPath = target.endsWith(".txt") ? target : resolve(target, "entry.txt");
  // Guard the sealed gate: 1-199 characters, not only whitespace.
  // The guard runs before any write, so a bad entry can never
  // reach /output/entry.txt and be scored invalid.
  if (ENTRY.length < 1 || ENTRY.length > 199 || ENTRY.trim().length === 0) {
    throw new Error(`entry out of gate: ${ENTRY.length} characters`);
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
}

main();
