// import * as uuid from 'uuid';
import { createId as cuid } from '@paralleldrive/cuid2';
import { exec } from 'node:child_process';
import * as pkg from './package.json' assert { type: 'json' };

const version = process.env.npm_package_datadog_version || pkg.datadog.version || pkg.version || cuid();
const path = process.env.npm_package_datadog_sourcemappath || pkg.datadog.sourcemappath;
const service = process.env.npm_package_datadog_service || pkg.datadog.service;
const minifiedpath = process.env.npm_package_datadog_minifiedpath || pkg.datadog.minifiedpath;
process.env.DATADOG_SITE = process.env.npm_package_datadog_site || pkg.datadog.site;
process.env.DATADOG_API_KEY = process.env.npm_package_datadog_apikey || pkg.datadog.apikey;

const cmd = `npx datadog-ci sourcemaps upload ${path} --service ${service} --minified-path-prefix ${minifiedpath} --release-version ${version} --disable-git`;
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

