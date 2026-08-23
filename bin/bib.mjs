#!/usr/bin/env node
// Convert between the .bib source of truth and the site's JSON data.
//
//   bib to-json   [in.bib]     exactly what _data/pubs.js feeds the templates
//   bib check     [in.bib]     parse and report problems (exit 1 on failure)
//
// Defaults to _data/pubs.bib when no input file is given.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildData, parseBibtex, isAuthorBlob } from "../lib/bib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_BIB = path.join(HERE, "..", "_data", "pubs.bib");

const USAGE = `Usage:
  bib to-json   [in.bib]     data as the site sees it (JSON to stdout)
  bib check     [in.bib]     parse and report problems
`;

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(`bib: no such file: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, "utf8");
}

const [cmd, file] = process.argv.slice(2);

switch (cmd) {
  case "to-json": {
    process.stdout.write(JSON.stringify(buildData(read(file || DEFAULT_BIB)), null, 2) + "\n");
    break;
  }

  case "check": {
    const target = file || DEFAULT_BIB;
    const { records, errors } = parseBibtex(read(target));
    const problems = errors.map((e) => `parse error: ${e.message || JSON.stringify(e)}`);

    const seen = new Map();
    for (const r of records) {
      if (!r.title) problems.push(`${r.key}: no title`);
      if (!r.year) problems.push(`${r.key}: no year`);
      if (!r.authors.length) problems.push(`${r.key}: no author`);
      if (!r.citation) problems.push(`${r.key}: citation line would render empty`);
      if (seen.has(r.key)) problems.push(`${r.key}: duplicate cite key`);
      seen.set(r.key, true);
      // "Last, First" vs "A, B, C" is ambiguous — flag, never auto-split.
      for (const a of r.authors.filter(isAuthorBlob)) {
        problems.push(`${r.key}: one author field holds several names — "${a}"`);
      }
    }

    const preprints = records.filter((r) => r.isPreprint);
    console.log(`${target}: ${records.length} entries (${preprints.length} preprints)`);
    for (const p of problems) console.log(`  ${p}`);
    if (problems.length) {
      console.log(`\n${problems.length} problem(s).`);
      process.exit(1);
    }
    console.log("OK");
    break;
  }

  default:
    console.error(USAGE);
    process.exit(cmd ? 1 : 0);
}
