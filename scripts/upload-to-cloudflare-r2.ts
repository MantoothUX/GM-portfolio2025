/**
 * Script to upload videos and large GIFs to Cloudflare R2
 *
 * Usage:
 * 1. Set up .env.local with R2 credentials
 * 2. Run: npm run upload:r2
 *
 * This script will:
 * - Upload videos and GIFs over 10MB to Cloudflare R2
 * - Maintain folder structure
 * - Generate a mapping file (cloudflare-r2-mapping.json) with local path -> R2 URL
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const accountId = process.env.VITE_CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'gack-folio-2026';
const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !endpoint) {
  console.error('Missing Cloudflare R2 credentials!');
  console.error('Please set up .env.local with:');
  console.error('  VITE_CLOUDFLARE_ACCOUNT_ID=your_account_id');
  console.error('  CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key');
  console.error('  CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key');
  console.error('  CLOUDFLARE_R2_BUCKET_NAME=gack-folio-2026');
  console.error('  CLOUDFLARE_R2_ENDPOINT=your_endpoint_url');
  process.exit(1);
}

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: endpoint,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

interface R2Mapping {
  localPath: string;
  r2Key: string;
  r2Url: string;
  uploaded: boolean;
}

const mapping: R2Mapping[] = [];
const publicDir = path.resolve(__dirname, '../public');

/**
 * Get all video and large GIF files recursively from a directory
 */
function getAllVideoFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
        continue;
      }
      files.push(...getAllVideoFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const stats = fs.statSync(fullPath);

      // Include videos and GIFs over 10MB
      if (['.mp4', '.webm', '.mov', '.avi'].includes(ext)) {
        files.push(fullPath);
      } else if (ext === '.gif' && stats.size > 10 * 1024 * 1024) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Convert local file path to R2 key (maintains folder structure)
 */
function pathToR2Key(filePath: string): string {
  const relativePath = path.relative(publicDir, filePath);
  return relativePath.replace(/\\/g, '/');
}

/**
 * Convert local file path to content path format
 */
function pathToContentPath(filePath: string): string {
  const relativePath = path.relative(publicDir, filePath);
  return `/${relativePath.replace(/\\/g, '/')}`;
}

/**
 * Generate R2 public URL
 */
function generateR2Url(r2Key: string): string {
  const baseUrl = endpoint!.replace(/\/$/, '');
  return `${baseUrl}/${r2Key}`;
}

/**
 * Upload a single file to R2
 */
async function uploadToR2(filePath: string): Promise<R2Mapping> {
  const contentPath = pathToContentPath(filePath);
  const r2Key = pathToR2Key(filePath);
  const r2Url = generateR2Url(r2Key);

  try {
    console.log(`  Uploading to R2: ${contentPath} -> ${r2Key}`);

    const fileContent = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: r2Key,
        Body: fileContent,
        ContentType: contentType,
      })
    );

    console.log(`  Uploaded: ${r2Url}`);

    return {
      localPath: contentPath,
      r2Key: r2Key,
      r2Url: r2Url,
      uploaded: true,
    };
  } catch (error: any) {
    console.error(`  Error uploading ${contentPath}:`, error.message);
    return {
      localPath: contentPath,
      r2Key: r2Key,
      r2Url: r2Url,
      uploaded: false,
    };
  }
}

/**
 * Get content type based on file extension
 */
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.gif': 'image/gif',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

/**
 * Main upload function
 */
async function main() {
  console.log('Starting Cloudflare R2 upload...\n');
  console.log(`Scanning: ${publicDir}\n`);
  console.log(`Bucket: ${bucketName}\n`);

  const videoFiles = getAllVideoFiles(publicDir);
  console.log(`Found ${videoFiles.length} video/large GIF files\n`);

  if (videoFiles.length === 0) {
    console.log('No videos or large GIFs found to upload.');
    return;
  }

  // Upload files in batches (smaller for larger files)
  const batchSize = 3;
  for (let i = 0; i < videoFiles.length; i += batchSize) {
    const batch = videoFiles.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(uploadToR2));
    mapping.push(...results);
    console.log(`\nProgress: ${Math.min(i + batchSize, videoFiles.length)}/${videoFiles.length}\n`);
  }

  // Save mapping file
  const mappingPath = path.resolve(__dirname, '../cloudflare-r2-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));

  const uploadedCount = mapping.filter((m) => m.uploaded).length;
  const failedCount = mapping.filter((m) => !m.uploaded).length;

  console.log('\nUpload Summary:');
  console.log(`  Uploaded: ${uploadedCount}`);
  console.log(`  Failed: ${failedCount}`);
  console.log(`\nMapping saved to: cloudflare-r2-mapping.json`);
}

main().catch(console.error);
