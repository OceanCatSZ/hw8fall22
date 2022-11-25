"use strict";

const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const p = require("./package.json");

const output = fs.createWriteStream(path.join(__dirname, `${p.name}-submission.zip`));
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.pipe(output);
archive.glob("*.js", { cwd: path.join(process.cwd(), "src") });
archive.finalize().then(() => output.close());
