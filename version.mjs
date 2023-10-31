import { createId as cuid } from '@paralleldrive/cuid2';
import { writeFileSync } from 'node:fs';

const version = cuid();
const json = JSON.stringify({ version });
const filename = './src/version.json';
writeFileSync(filename, json);
console.log(`filename: ${filename} version: ${version}`);

process.exit(0);
