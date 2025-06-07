#!/usr/bin/env -S deno run --allow-net=raw.githubusercontent.com

import { parseBibtex } from "./parse.ts";

if (import.meta.main) {
  const bibtexText = await (await fetch(
    "https://raw.githubusercontent.com/plk/biblatex/8e5b0605f017b64af04463447e10f02c933dee89/bibtex/bib/biblatex/biblatex-examples.bib",
  )).text();
  const bibtexEntries = parseBibtex(bibtexText);
  console.log(
    JSON.stringify(bibtexEntries, null, 2),
  );
}
