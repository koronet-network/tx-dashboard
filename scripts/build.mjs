import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appName = "tx-portfolio";
const outputPath = "dist";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outputDir = path.resolve(root, outputPath);

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });
await cp(publicDir, outputDir, { recursive: true });

await mkdir(path.join(outputDir, ".well-known"), { recursive: true });
await writeFile(
  path.join(outputDir, ".well-known", "groot-static-site.json"),
  JSON.stringify(
    {
      app: appName,
      template: "static-site",
      outputPath,
      spaFallback: false,
      generatedAt: new Date().toISOString()
    },
    null,
    2
  ) + "\n"
);

console.log(`built ${appName} static output at ${outputPath}`);
