// Global `pubs` data, generated from _data/pubs.bib at build time.

const fs = require("fs");
const path = require("path");

const BIB = path.join(__dirname, "pubs.bib");

module.exports = async function () {
  const { buildData } = await import("../lib/bib.mjs");
  const data = buildData(fs.readFileSync(BIB, "utf8"));

  // A malformed entry silently losing authors is worse than a noisy build.
  for (const err of data.errors) {
    console.warn(`[pubs.bib] ${err.error || err.message || JSON.stringify(err)}`);
  }

  return data;
};
