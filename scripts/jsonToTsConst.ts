#!/usr/bin/env -S npx tsx

import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

import { camelCase } from 'change-case';
import { glob } from 'glob';

async function jsonToTs(inputFilePath: string, outputFilePath: string) {
  try {
    const rawData = await readFile(inputFilePath);
    const jsonContent = JSON.parse(rawData.toString()) as unknown;

    const tsContent = `export const abi = ${JSON.stringify(jsonContent, null, 2)} as const;\n`;

    await writeFile(outputFilePath, tsContent, 'utf8');
    console.log(`Generated TypeScript file at ${outputFilePath}`);
  } catch (error) {
    console.error(`Failed to convert JSON to TS: ${String(error)}`);
    process.exit(1);
  }
}

async function matchFiles(inputPattern: string) {
  try {
    const files = await glob(inputPattern);
    return files;
  } catch (error) {
    console.error(`Error finding files with pattern ${inputPattern}: ${String(error)}`);
    process.exit(1);
  }
}

async function processFiles(inputPattern: string, outputDir: string) {
  const files = await matchFiles(inputPattern);

  // Ensure the output directory exists
  await mkdir(outputDir, { recursive: true });

  files.forEach(async (file) => {
    const baseName = path.basename(file, path.extname(file));
    const outputFilePath = path.join(outputDir, `${camelCase(baseName)}.ts`);
    await jsonToTs(file, outputFilePath);
  });
}

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Please provide a glob pattern for input files and an output directory.');
  process.exit(1);
}

const inputPattern = args[0] as string;
const outputDir = path.resolve(args[1] as string);

await processFiles(inputPattern, outputDir);
