const entriesRegex = /@\w+\s*\{[^@]*\}/g;
const entryHeaderRegex = /@(\w+)\s*\{\s*([^,]+),/;
const entryFieldRegex =
  /(\w+)\s*=\s*(?:\{((?:[^{}]|\{.*?\})*)\}|"\{?(.*?)\}?"|'\{?(.*?)\}?'|(.+?))(?:\s*#.+?)?\s*[,}]/g;

/** BibtexEntry represents a BibTex / BibLaTeX entry */
export type BibtexEntry = {
  type: string;
  citeKey: string;
  fields: Record<string, string>;
};

/** parseBibtex parses a BibTeX / BibLaTeX string into an array of {@link BibtexEntry}. */
export const parseBibtex = (input: string): BibtexEntry[] =>
  input
    .match(entriesRegex)
    ?.flatMap((e) => parseBibtexEntry(e) ?? []) ?? [];

/** parseBibtexEntry parses a single BibTeX / BibLaTeX entry into {@link BibtexEntry} */
export const parseBibtexEntry = (input: string): BibtexEntry | null => {
  const entryHeader = input.match(entryHeaderRegex);
  if (!entryHeader) return null;

  const [, entryType, citeKey] = entryHeader;
  const entry: BibtexEntry = {
    type: entryType,
    citeKey: citeKey,
    fields: {},
  };

  const fieldMatchs = input
    .substring(entryHeader[0].length)
    .trim()
    .replaceAll(/\n\s*/g, " ")
    .matchAll(entryFieldRegex);
  for (const fieldMatch of fieldMatchs) {
    const [_, key, braced, doubleQuoted, singleQuoted, unquoted] = fieldMatch;
    const value = braced ?? doubleQuoted ?? singleQuoted ?? unquoted;
    entry.fields[key.toLowerCase()] = value;
  }

  return entry;
};
