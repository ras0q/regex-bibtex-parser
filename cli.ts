#!/usr/bin/env -S deno run --allow-net=raw.githubusercontent.com

import { parseBibtex } from "./parse.ts";
import { toArrayBuffer } from "@std/streams";

if (import.meta.main) {
  const buf = await toArrayBuffer(Deno.stdin.readable);
  const decoder = new TextDecoder();
  const input = decoder.decode(buf);

  const bibtexEntries = parseBibtex(input);
  console.log(JSON.stringify(bibtexEntries, null, 2));
}
