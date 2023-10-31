import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import { readdirSync, readFileSync, lstatSync } from 'node:fs';
import { join, dirname, sep } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { fileTypeFromFile, fileTypeFromBlob }  from 'file-type';
import * as mime from 'mime';
import * as mimetypes from 'mime-types';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 *
 *
 * @return {S3Client}
 */
const initAws = () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  return client;
};

const s3 = initAws();
const dist = join(__dirname, 'dist');
const files = readdirSync(dist).map(file => join(dist, file)).filter(file => lstatSync(file).isFile());

const uploadFile = async (file) => {
  const blob = readFileSync(file);
  const buffer = Buffer.from(blob);
  const filename = file.split(sep).pop();
  const contentType = mimetypes.lookup(file);
  const payload = {
    ContentType: contentType,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: buffer,
    Key: filename,
  };
  const command = new PutObjectCommand(payload);
  const response = await s3.send(command);

  return response;
};

const main = async () => {
  for (let file of files) {
    const { $metadata, ETag } = await uploadFile(file);
    const { httpStatusCode } = $metadata;
    console.log(`File: ${file}} status: ${httpStatusCode} etag: ${ETag} `);
  }
};

void main();
