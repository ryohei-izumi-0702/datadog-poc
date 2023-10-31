// import * as uuid from 'uuid';
// import { createId as cuid } from '@paralleldrive/cuid2';
// import * as pkg from './package.json' assert { type: 'json' };
import * as dotenv from 'dotenv';
import { readFileSync } from 'node:fs';
import { exec } from 'node:child_process';

dotenv.config();
const { version } = JSON.parse(readFileSync('./src/version.json'));
const { service, env } = JSON.parse(readFileSync('./src/datadog.json'));
const sourcemappath = './dist';
const minifiedpath = process.env.AWS_S3_URL;
const repo = process.env.DATADOG_GIT_REPO;

const cmd = `npx datadog-ci sourcemaps upload ${sourcemappath} --service ${service} --minified-path-prefix ${minifiedpath} --release-version ${version} --repository-url ${repo}`;
console.log(cmd);

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }

  if (stdout) {
    console.log(stdout);
  }

  process.exit(0);
})

