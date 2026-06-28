// /app/lib/projects.js
// =========================================================================
//  MOVARO · Project data
//  Add / edit projects here. NO layout changes ever required.
// -------------------------------------------------------------------------
//  How to plug in Cloudinary (3 supported approaches — pick whichever you like):
//
//  APPROACH A — paste a FULL Cloudinary URL  (simplest, recommended)
//    thumbnail: 'https://res.cloudinary.com/prtfolio/image/upload/v123/movaro/aether-thumb.jpg',
//    videoUrl:  'https://res.cloudinary.com/dv4qsvfja/video/upload/v1782635906/sure4_istdsv.mp4',
//
//  APPROACH B — paste only the Cloudinary PUBLIC ID  (cleaner, auto-optimised)
//    thumbnail:    cld('movaro/aether-thumb'),                 // image
//    previewImage: cldPoster('movaro/aether-reel'),            // poster auto-extracted from video
//    videoUrl:     cldVideo('movaro/aether-reel'),             // mp4 delivery
//
//  APPROACH C — mix and match.  Any non-Cloudinary URL is passed through unchanged.
//
//  Fields (every project supports all of these):
//    id            url slug, used by /work/[slug]
//    title         display title (huge)
//    category      e.g. 'Brand Film', 'Title Sequence'
//    year          e.g. '2025'
//    description   long paragraph rendered as case-study lede
//    thumbnail     grid card image
//    previewImage  case-study HERO image AND video poster (optional, falls back to thumbnail)
//    videoUrl      MP4 / WebM / HLS — autoplay-muted-loop on the case-study page
//    softwareUsed  array of tool names rendered as chips
//    credits       free-form attribution string
//    links         object — only non-empty keys are shown. Supported keys:
//                  instagram, behance, youtube, vimeo, website, github, drive, custom
// =========================================================================

import { cld, cldVideo, cldPoster } from './cloudinary';

export const PROJECTS = [
  {
    id: 'aether',
    title: 'Aether',
    category: 'Brand Film',
    year: '2025',
    description:
      'A cinematic identity reveal exploring weightlessness, light and form. Crafted with bespoke 3D type, volumetric atmospherics and a slow, deliberate edit that lets each frame breathe.',

    // 👇 PASTE YOUR CLOUDINARY URLS HERE 👇
    // Replace these placeholder URLs with your Cloudinary assets.
    // Examples:
    //   thumbnail:    cld('movaro/aether-thumb'),
    //   previewImage: cldPoster('movaro/aether-reel'),
    //   videoUrl:     cldVideo('movaro/aether-reel'),
    thumbnail: 'https://res.cloudinary.com/dv4qsvfja/image/upload/v1782635062/samples/waves.png',
    previewImage: 'https://res.cloudinary.com/dv4qsvfja/image/upload/v1782635062/samples/waves.png', // optional — leave empty to reuse thumbnail
    videoUrl: 'https://res.cloudinary.com/dv4qsvfja/video/upload/v1782635906/sure4_istdsv.mp4',

    softwareUsed: ['Cinema 4D', 'Octane', 'After Effects'],
    credits: 'Direction & Motion — Movaro · Sound — Studio Atlas',
    links: {
      instagram: 'https://instagram.com',
      behance: 'https://behance.net',
      youtube: '',
      vimeo: 'https://vimeo.com',
      website: '',
      github: '',
      drive: '',
      custom: ''
    }
  },

  {
    id: 'noir-monolith',
    title: 'Noir Monolith',
    category: 'Product Reveal',
    year: '2025',
    description:
      'A luxury product film for a fictional fragrance house. Liquid metal simulations, macro detail studies and a soundtrack composed in 4/4 silence — premium restraint over spectacle.',

    // 👇 PASTE YOUR CLOUDINARY URLS HERE 👇
    thumbnail: 'https://images.unsplash.com/photo-1639674242803-a9de33b3a835?w=1600&q=80',
    previewImage: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',

    softwareUsed: ['Houdini', 'Redshift', 'Nuke'],
    credits: 'Direction — Movaro · CG — Studio Hue',
    links: {
      instagram: '',
      behance: 'https://behance.net',
      youtube: 'https://youtube.com',
      vimeo: '',
      website: 'https://example.com',
      github: '',
      drive: '',
      custom: ''
    }
  },

  {
    id: 'silent-architecture',
    title: 'Silent Architecture',
    category: 'Title Sequence',
    year: '2024',
    description:
      'A title sequence study for an unmade thriller. Long-lens parallax, kinetic serif typography and an unhurried camera that lets tension build through composition rather than cut.',

    // 👇 PASTE YOUR CLOUDINARY URLS HERE 👇
    thumbnail: 'https://images.unsplash.com/photo-1637946175559-22c4fe13fc54?w=1600&q=80',
    previewImage: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',

    softwareUsed: ['After Effects', 'Cinema 4D', 'DaVinci Resolve'],
    credits: 'Direction & Design — Movaro',
    links: {
      instagram: 'https://instagram.com',
      behance: '',
      youtube: '',
      vimeo: 'https://vimeo.com',
      website: '',
      github: '',
      drive: '',
      custom: ''
    }
  },

  {
    id: 'orbital-form',
    title: 'Orbital Form',
    category: '3D / Motion Study',
    year: '2024',
    description:
      'An exploration of repetition, rotation and the dignity of a single shape. Each loop is a meditation — minimal palette, exacting timing, and a quiet sense of inevitability.',

    // 👇 PASTE YOUR CLOUDINARY URLS HERE 👇
    thumbnail: 'https://images.unsplash.com/photo-1632059368252-be6d65abc4e2?w=1600&q=80',
    previewImage: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',

    softwareUsed: ['Cinema 4D', 'Octane'],
    credits: 'All work — Movaro',
    links: {
      instagram: '',
      behance: 'https://behance.net',
      youtube: '',
      vimeo: '',
      website: '',
      github: '',
      drive: 'https://drive.google.com',
      custom: ''
    }
  },

  {
    id: 'gilded-frame',
    title: 'Gilded Frame',
    category: 'Editorial Motion',
    year: '2023',
    description:
      'A motion editorial inspired by the architecture of jewellery — chiseled forms, soft caustics and a single muted-gold accent threaded through every frame.',

    // 👇 PASTE YOUR CLOUDINARY URLS HERE 👇
    thumbnail: 'https://images.unsplash.com/photo-1633269540827-728aabbb7646?w=1600&q=80',
    previewImage: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',

    softwareUsed: ['Blender', 'After Effects'],
    credits: 'Direction — Movaro · Score — Field Notes',
    links: {
      instagram: '',
      behance: '',
      youtube: '',
      vimeo: '',
      website: 'https://example.com',
      github: 'https://github.com',
      drive: '',
      custom: ''
    }
  },

  {
    id: 'umbra',
    title: 'Umbra',
    category: 'Cinematic Loop',
    year: '2023',
    description:
      'Light as a character. A study of a single beam carving form out of darkness — restrained, theatrical, and built to loop seamlessly on a gallery wall.',

    // 👇 PASTE YOUR CLOUDINARY URLS HERE 👇
    thumbnail: 'https://images.pexels.com/photos/4722576/pexels-photo-4722576.jpeg?auto=compress&w=1600',
    previewImage: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',

    softwareUsed: ['Houdini', 'Nuke', 'DaVinci Resolve'],
    credits: 'Direction — Movaro',
    links: {
      instagram: 'https://instagram.com',
      behance: '',
      youtube: 'https://youtube.com',
      vimeo: 'https://vimeo.com',
      website: '',
      github: '',
      drive: '',
      custom: ''
    }
  }
];

export const LINK_LABELS = {
  instagram: 'Instagram',
  behance: 'Behance',
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  website: 'Website',
  github: 'GitHub',
  drive: 'Google Drive',
  custom: 'Visit'
};

// previewImage falls back to thumbnail automatically (used as case-study hero + video poster)
export const getPreview = (p) => p?.previewImage || p?.thumbnail || '';

export const findProject = (slug) => PROJECTS.find((p) => p.id === slug) || null;
export const findNext = (slug) => {
  const i = PROJECTS.findIndex((p) => p.id === slug);
  if (i < 0) return PROJECTS[0];
  return PROJECTS[(i + 1) % PROJECTS.length];
};
