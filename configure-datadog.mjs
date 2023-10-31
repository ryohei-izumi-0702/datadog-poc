import * as dotenv from 'dotenv';
import { writeFileSync } from 'node:fs';

dotenv.config();

const applicationId = process.env.DATADOG_APPLICATION_ID;
const clientToken = process.env.DATADOG_CLIENT_TOKEN;
const forwardErrorsToLogs = true;
const service = 'aswbe:spa:poc';
const env = 'dev';
const site = process.env.DATADOG_SITE;
const data = {
  applicationId,
  clientToken,
  forwardErrorsToLogs,
  service,
  env,
  site,
};

const json = JSON.stringify(data);
const filename = './src/datadog.json';
writeFileSync(filename, json);
console.log(`filename: ${filename} ${json}`);

process.exit(0);
