/**
 * Script to update projects.json with Cloudflare image IDs and R2 URLs
 *
 * Usage:
 * 1. Run upload scripts first to generate mapping files
 * 2. Run: npm run update:cloudflare-content
 *
 * This script will:
 * - Read cloudflare-images-mapping.json and cloudflare-r2-mapping.json
 * - Update src/data/projects.json with cloudflareImageId and cloudflareR2Url fields
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentPath = path.resolve(__dirname, '../src/data/projects.json');
const imagesMappingPath = path.resolve(__dirname, '../cloudflare-images-mapping.json');
const r2MappingPath = path.resolve(__dirname, '../cloudflare-r2-mapping.json');

interface ContentData {
  projects: Array<{
    id: string;
    heroImage: string;
    galleryImages: string[];
    cloudflareImageId: string | null;
    cloudflareGalleryIds: (string | null)[];
    cloudflareR2Url: string | null;
    cloudflareGalleryR2Urls: (string | null)[];
    [key: string]: any;
  }>;
  mediaGallery: Array<{
    image: string;
    cloudflareImageId: string | null;
    cloudflareR2Url: string | null;
    [key: string]: any;
  }>;
  about: {
    photo: string;
    cloudflareImageId: string | null;
    cloudflareR2Url: string | null;
  };
  footer: {
    gifImage: string | null;
    gifCloudflareR2Url: string | null;
  };
}

interface ImageMapping {
  localPath: string;
  cloudflareImageId: string;
  cloudflareUrl: string;
  accountHash: string;
  uploaded: boolean;
}

interface R2Mapping {
  localPath: string;
  r2Key: string;
  r2Url: string;
  uploaded: boolean;
}

function updateContentJson() {
  try {
    const content: ContentData = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

    // Read mapping files
    let imagesMapping: ImageMapping[] = [];
    let r2Mapping: R2Mapping[] = [];

    if (fs.existsSync(imagesMappingPath)) {
      imagesMapping = JSON.parse(fs.readFileSync(imagesMappingPath, 'utf-8'));
    } else {
      console.warn('cloudflare-images-mapping.json not found. Run upload:images first.');
    }

    if (fs.existsSync(r2MappingPath)) {
      r2Mapping = JSON.parse(fs.readFileSync(r2MappingPath, 'utf-8'));
    } else {
      console.warn('cloudflare-r2-mapping.json not found. Run upload:r2 first.');
    }

    // Create lookup maps
    const pathToImageIdMap = new Map<string, ImageMapping>();
    imagesMapping.forEach((item) => {
      if (item.uploaded && item.cloudflareImageId) {
        pathToImageIdMap.set(item.localPath, item);
      }
    });

    const pathToR2Map = new Map<string, R2Mapping>();
    r2Mapping.forEach((item) => {
      if (item.uploaded && item.r2Url) {
        pathToR2Map.set(item.localPath, item);
      }
    });

    // Update projects
    content.projects.forEach((project) => {
      // Update hero image
      if (project.heroImage) {
        const imageMapping = pathToImageIdMap.get(project.heroImage);
        const r2MappingItem = pathToR2Map.get(project.heroImage);

        if (imageMapping) {
          project.cloudflareImageId = imageMapping.cloudflareImageId;
        } else if (r2MappingItem) {
          project.cloudflareR2Url = r2MappingItem.r2Url;
        }
      }

      // Update gallery images (preserve array index alignment)
      if (project.galleryImages && Array.isArray(project.galleryImages)) {
        project.cloudflareGalleryIds = project.galleryImages.map((img: string) => {
          const mapping = pathToImageIdMap.get(img);
          return mapping?.cloudflareImageId || null;
        });

        project.cloudflareGalleryR2Urls = project.galleryImages.map((img: string) => {
          const mapping = pathToR2Map.get(img);
          return mapping?.r2Url || null;
        });
      }
    });

    // Update media gallery
    content.mediaGallery.forEach((item) => {
      if (item.image) {
        const imageMapping = pathToImageIdMap.get(item.image);
        const r2MappingItem = pathToR2Map.get(item.image);

        if (imageMapping) {
          item.cloudflareImageId = imageMapping.cloudflareImageId;
        } else if (r2MappingItem) {
          item.cloudflareR2Url = r2MappingItem.r2Url;
        }
      }
    });

    // Update about photo
    if (content.about && content.about.photo) {
      const imageMapping = pathToImageIdMap.get(content.about.photo);
      const r2MappingItem = pathToR2Map.get(content.about.photo);

      if (imageMapping) {
        content.about.cloudflareImageId = imageMapping.cloudflareImageId;
      } else if (r2MappingItem) {
        content.about.cloudflareR2Url = r2MappingItem.r2Url;
      }
    }

    // Update footer GIF
    if (content.footer && content.footer.gifImage) {
      const r2MappingItem = pathToR2Map.get(content.footer.gifImage);
      if (r2MappingItem) {
        content.footer.gifCloudflareR2Url = r2MappingItem.r2Url;
      }
    }

    // Write updated projects.json
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf-8');
    console.log('Updated projects.json with Cloudflare image IDs and R2 URLs');

    // Print summary
    const projectsWithImages = content.projects.filter(
      (p) => p.cloudflareImageId || p.cloudflareR2Url
    ).length;
    console.log(`\nSummary:`);
    console.log(`  Projects with Cloudflare images: ${projectsWithImages}/${content.projects.length}`);
    console.log(
      `  About photo: ${content.about?.cloudflareImageId || content.about?.cloudflareR2Url ? 'Yes' : 'No'}`
    );
    console.log(
      `  Footer GIF: ${content.footer?.gifCloudflareR2Url ? 'Yes' : 'No'}`
    );
  } catch (error: any) {
    console.error('Error updating projects.json:', error.message);
    process.exit(1);
  }
}

updateContentJson();
