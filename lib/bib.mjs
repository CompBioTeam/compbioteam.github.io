// Shared BibTeX <-> site-data conversion.
//
// Used by _data/pubs.js (every build) and bin/bib.mjs (the CLI), so the site and
// the tool can never disagree about what a .bib entry means.
//
// ESM because @retorquere/bibtex-parser is ESM-only (its CJS build is broken:
// package.json declares "type": "module" but dist/cjs/index.js uses module.exports).

import { parse } from "@retorquere/bibtex-parser";

const PARSE_OPTIONS = {
  sentenceCase: false,
};

const PREPRINT_SERVERS = [
  { server: "bioRxiv", re: /biorxiv/i },
  { server: "medRxiv", re: /medrxiv/i },
  { server: "arXiv", re: /arxiv/i },
];

const str = (v) => {
  if (v == null) return "";
  if (Array.isArray(v)) return v.map(str).filter(Boolean).join(", ");
  return String(v).replace(/\s*\n\s*/g, " ").trim();
};

// For handwritten values that bypass dashes (e.g. the BibJSON migration path).
const dashes = (s) => s.replace(/(\d)\s*--\s*(\d)/g, "$1–$2");

/**
 * Too many authors?
 */
export function isAuthorBlob(name) {
  return (String(name).match(/,/g) || []).length >= 2;
}

/** "Górecki, Pawel" from the parser's {lastName, firstName} shape. */
function authorName(a) {
  if (typeof a === "string") return a.trim();
  const last = str(a.lastName || a.name || a.literal || "");
  const first = str(a.firstName || "");
  const suffix = str(a.suffix || "");
  let name = first ? `${last}, ${first}` : last;
  if (suffix) name += `, ${suffix}`;
  return name.trim();
}

/**
 * Is this a preprint, and on which server?
 */
export function preprintServer(f) {
  const haystack = [f.journal, f.booktitle, f.howpublished, f.note, f.publisher]
    .map(str)
    .join(" ");
  const ids = [f.doi, f.url, f.link].map(str).join(" ");

  for (const { server, re } of PREPRINT_SERVERS) {
    if (re.test(haystack) || re.test(ids)) return server;
  }
  // arXiv entries usually carry eprint/archivePrefix rather than a journal.
  if (str(f.archiveprefix).toLowerCase() === "arxiv" || str(f.eprinttype).toLowerCase() === "arxiv") {
    return "arXiv";
  }
  if (str(f.eprint) && !str(f.journal)) return "arXiv";
  // Bare DOI prefixes, when nothing else identified the venue.
  if (/^10\.1101\//.test(str(f.doi))) return "bioRxiv";
  if (/^10\.48550\//.test(str(f.doi))) return "arXiv";
  // Explicit manual override.
  if (/\bpreprints?\b/i.test(str(f.keywords)) || /\bpreprint\b/i.test(haystack)) {
    return str(f.journal) || "Preprint";
  }
  return "";
}

/**
 * The journal/conference under authors.
 */
export function formatCitation(r) {
  const parts = [];
  const volNum = r.volume && r.number ? `${r.volume}(${r.number})` : r.volume || r.number || "";

  if (r.isPreprint) {
    parts.push(r.eprint && r.server === "arXiv" ? `${r.server}:${r.eprint}` : r.server);
  } else {
    switch (r.type) {
      case "article":
        parts.push(r.venue, volNum, r.pages);
        break;
      case "inproceedings":
      case "conference":
      case "proceedings":
        parts.push(r.venue, r.pages);
        break;
      case "inbook":
      case "incollection":
        parts.push(r.venue ? `In ${r.venue}` : "", r.publisher, r.pages);
        break;
      case "book":
        parts.push(r.publisher, volNum);
        break;
      default:
        parts.push(r.venue, r.publisher, r.pages);
    }
  }
  parts.push(r.year);
  return parts.filter(Boolean).join(", ");
}

/** BibTeX entry to flat record for template */
function normalize(entry) {
  const f = entry.fields || {};
  const type = String(entry.type || "misc").toLowerCase();
  const server = preprintServer(f);

  const authors = (Array.isArray(f.author) ? f.author : f.author ? [f.author] : [])
    .map(authorName)
    .filter(Boolean);

  const doi = str(f.doi);
  const eprint = str(f.eprint);
  let link = str(f.url) || str(f.link);
  if (link === "#") link = ""; // the old BibJSON's no-URL placeholder
  if (!link && doi) link = `https://doi.org/${doi}`;
  // arXiv entries usually carry only an eprint id, which is enough for a link.
  if (!link && eprint && server === "arXiv") link = `https://arxiv.org/abs/${eprint}`;

  const venue = str(f.journal) || str(f.booktitle) || str(f.howpublished);

  const record = {
    key: str(entry.key),
    type,
    title: dashes(str(f.title)),
    year: str(f.year) || str(f.date).slice(0, 4),
    authors,
    authorList: authors.join("; "),
    venue: server || venue,
    volume: str(f.volume),
    number: str(f.number),
    pages: dashes(str(f.pages)),
    publisher: str(f.publisher),
    organization: str(f.organization),
    address: str(f.address),
    doi,
    eprint,
    link,
    isPreprint: Boolean(server),
    server,
    // The verbatim source of this entry, for the site's "copy .bib" button.
    bibtex: String(entry.input || "").trim(),
  };
  record.citation = formatCitation(record);
  return record;
}

/** BibTeX text -> records, unsorted. */
export function parseBibtex(text) {
  const result = parse(text, PARSE_OPTIONS);
  return {
    records: (result.entries || []).map(normalize),
    errors: result.errors || [],
  };
}

const byYearDesc = (a, b) => Number(b.year || 0) - Number(a.year || 0);

/**
 * BibTeX text -> everything publications.md needs.
 * Sorting lives here, not in the template, so the .bib can be in any order.
 */
export function buildData(text) {
  const { records, errors } = parseBibtex(text);

  const preprints = records.filter((r) => r.isPreprint).sort(byYearDesc);
  const published = records.filter((r) => !r.isPreprint).sort(byYearDesc);

  const byYear = [];
  for (const r of published) {
    const last = byYear[byYear.length - 1];
    if (last && last.year === r.year) last.items.push(r);
    else byYear.push({ year: r.year, items: [r] });
  }

  // Preprints first, then one section per year. 
  const sections = [];
  if (preprints.length) sections.push({ id: "preprints", title: "Preprints", items: preprints });
  for (const g of byYear) sections.push({ id: g.year, title: g.year, items: g.items });

  return { sections, preprints, byYear, records: published, count: records.length, errors };
}
