#!/usr/bin/env node
/**
 * Process the official Eatmed mark for web use:
 *
 *   public/logo/mark.png       — light-theme variant (original navy + green)
 *   public/logo/mark-dark.png  — dark-theme variant (navy → near-white,
 *                                green untouched) so it stays readable on
 *                                the dark navy site background
 *
 * Both sourced from the original 1254×1254 master that the user provided.
 * Pure sharp pipeline — no external binaries required.
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const sourcePath = path.resolve('public/logo/mark.png');
const darkPath = path.resolve('public/logo/mark-dark.png');

// Read whatever's there now (could be the user's original RGB master,
// or a previously-processed RGBA version — both work).
const src = await readFile(sourcePath);

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const WHITE_T = 240; // RGB threshold above which a pixel is treated as background
const NAVY_HUE_MAX_BLUE = 90; // navy is dark and blueish, so a low R/G with B > R+G is "navy"
const LIGHT = { r: 245, g: 245, b: 248 }; // replacement for navy in the dark variant

const lightOut = Buffer.alloc(info.width * info.height * 4);
const darkOut = Buffer.alloc(info.width * info.height * 4);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
  const isWhite = r >= WHITE_T && g >= WHITE_T && b >= WHITE_T;
  // navy ≈ dark + slightly blue-dominant
  const isNavy = !isWhite && r < NAVY_HUE_MAX_BLUE && g < NAVY_HUE_MAX_BLUE && b < 120;

  // Light variant — just knock white to transparent
  if (isWhite) {
    lightOut[i] = lightOut[i + 1] = lightOut[i + 2] = lightOut[i + 3] = 0;
  } else {
    lightOut[i] = r; lightOut[i + 1] = g; lightOut[i + 2] = b; lightOut[i + 3] = a;
  }

  // Dark variant — knock white, swap navy for off-white, keep green
  if (isWhite) {
    darkOut[i] = darkOut[i + 1] = darkOut[i + 2] = darkOut[i + 3] = 0;
  } else if (isNavy) {
    darkOut[i] = LIGHT.r; darkOut[i + 1] = LIGHT.g; darkOut[i + 2] = LIGHT.b; darkOut[i + 3] = a;
  } else {
    darkOut[i] = r; darkOut[i + 1] = g; darkOut[i + 2] = b; darkOut[i + 3] = a;
  }
}

const raw = { width: info.width, height: info.height, channels: 4 };

await sharp(lightOut, { raw })
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(sourcePath);

await sharp(darkOut, { raw })
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(darkPath);

const lightSize = (await readFile(sourcePath)).length;
const darkSize = (await readFile(darkPath)).length;
console.log(`mark.png       → 512×512  ${lightSize} bytes`);
console.log(`mark-dark.png  → 512×512  ${darkSize} bytes`);
