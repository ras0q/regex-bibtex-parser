# @ras0q/regex-bibtex-parser

[![JSR][jsr-badge]][jsr-link] [![JSR Score][jsr-score-badge]][jsr-link]

A lightweight BibTeX / BibLaTeX parser using regex.

This package parses BibTeX fields into JavaScript's `Record<string, string>`, so
if you need more strong typing, consider using other packages.

## Getting started

```bash
deno add jsr:@ras0q/regex-bibtex-parser
pnpm add jsr:@ras0q/regex-bibtex-parser
yarn add jsr:@ras0q/regex-bibtex-parser
```

## As a JavaScript package

```typescript
// import { parseBibtex } from "jsr:@ras0q/regex-bibtex-parser@0.1.2";
import { parseBibtex } from "@ras0q/regex-bibtex-parser";

if (import.meta.main) {
  const bibtexURL =
    "https://raw.githubusercontent.com/plk/biblatex/8e5b0605f017b64af04463447e10f02c933dee89/bibtex/bib/biblatex/biblatex-examples.bib";
  const bibtexText = await (await fetch(bibtexURL)).text();
  const bibtexEntries = parseBibtex(bibtexText);
  console.log(JSON.stringify(bibtexEntries, null, 2));
}
```

## As a CLI

```bash
cat ./bibtex.bib | deno run jsr:@ras0q/regex-bibtex-parser
# [
#   {
#     "type": "incollection",
#     "citeKey": "westfahl:space",
#     "fields": {
#       "author": "Westfahl, Gary",
#       "title": "The True Frontier",
#       "subtitle": "Confronting and Avoiding the Realities of Space in {American} Science Fiction Films",
#       "pages": "55-65",
#       "crossref": "westfahl:frontier",
# ...
```

[jsr-link]: https://jsr.io/@ras0q/regex-bibtex-parser
[jsr-badge]: https://jsr.io/badges/@ras0q/regex-bibtex-parser
[jsr-score-badge]: https://jsr.io/badges/@ras0q/regex-bibtex-parser/score
