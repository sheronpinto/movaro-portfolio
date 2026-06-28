// /app/lib/cloudinary.js
// Tiny URL helper for Cloudinary delivery URLs.
//
// You DO NOT have to use these helpers — you can paste a full Cloudinary URL
// directly into any field in /app/lib/projects.js. The helpers exist so you
// can paste a short public_id and let the URL be built for you.
//
// Example public_id (the path you used when you uploaded the asset):
//   movaro/aether-thumb           -> image
//   movaro/aether-reel            -> video
//
// Cloud name is read from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (set in /app/.env).
// Server-only CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET stay private and are
// reserved for future signed-upload / admin endpoints.

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'prtfolio';

const joinTransforms = (t) => (t && t.length ? t.join(',') + '/' : '');

/**
 * Build a Cloudinary IMAGE delivery URL.
 * @param {string} publicId  e.g. 'movaro/aether-thumb'
 * @param {object} [opts]    { width, quality, format, transforms }
 */
export function cld(publicId, opts = {}) {
  if (!publicId) return '';
  if (/^https?:\/\//.test(publicId)) return publicId; // already a full URL
  const t = [
    'f_' + (opts.format || 'auto'),
    'q_' + (opts.quality || 'auto'),
    opts.width ? 'w_' + opts.width : null,
    'c_fill'
  ].filter(Boolean);
  if (opts.transforms) t.push(...opts.transforms);
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${joinTransforms(t)}${publicId}`;
}

/**
 * Build a Cloudinary VIDEO delivery URL.
 * @param {string} publicId  e.g. 'movaro/aether-reel'
 * @param {object} [opts]    { format ('mp4'|'webm'|'auto'), quality, transforms }
 */
export function cldVideo(publicId, opts = {}) {
  if (!publicId) return '';
  if (/^https?:\/\//.test(publicId)) return publicId;
  const fmt = opts.format || 'mp4';
  const t = ['q_' + (opts.quality || 'auto')];
  if (opts.transforms) t.push(...opts.transforms);
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${joinTransforms(t)}${publicId}.${fmt}`;
}

/**
 * Convenience: derive a still poster image from a video public_id.
 * Cloudinary auto-extracts frame 0 as a JPG.
 */
export function cldPoster(videoPublicId, opts = {}) {
  if (!videoPublicId) return '';
  if (/^https?:\/\//.test(videoPublicId)) return videoPublicId;
  const t = [
    'f_' + (opts.format || 'jpg'),
    'q_' + (opts.quality || 'auto'),
    opts.width ? 'w_' + opts.width : null,
    'c_fill'
  ].filter(Boolean);
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${joinTransforms(t)}${videoPublicId}.jpg`;
}
