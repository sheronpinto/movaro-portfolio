// MOVARO — Edit this file to add/modify projects. No layout changes needed.
// CMS-ready: shape mirrors what a Sanity/Supabase/Notion record would return.

export const PROJECTS = [
  {
    id: 'aether-motion',
    title: 'Aether',
    category: 'Brand Film',
    year: '2025',
    description:
      'A cinematic identity reveal exploring weightlessness, light and form. Crafted with bespoke 3D type, volumetric atmospherics and a slow, deliberate edit that lets each frame breathe.',
    thumbnail: 'https://images.unsplash.com/photo-1698807390276-725f3a7e41cf?w=1600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    software: ['Cinema 4D', 'Octane', 'After Effects'],
    credits: 'Direction & Motion — Movaro · Sound — Studio Atlas',
    links: {
      behance: 'https://behance.net',
      vimeo: 'https://vimeo.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'noir-monolith',
    title: 'Noir Monolith',
    category: 'Product Reveal',
    year: '2025',
    description:
      'A luxury product film for a fictional fragrance house. Liquid metal simulations, macro detail studies and a soundtrack composed in 4/4 silence — premium restraint over spectacle.',
    thumbnail: 'https://images.unsplash.com/photo-1639674242803-a9de33b3a835?w=1600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    software: ['Houdini', 'Redshift', 'Nuke'],
    credits: 'Direction — Movaro · CG — Studio Hue',
    links: {
      behance: 'https://behance.net',
      youtube: 'https://youtube.com',
      website: 'https://example.com'
    }
  },
  {
    id: 'silent-architecture',
    title: 'Silent Architecture',
    category: 'Title Sequence',
    year: '2024',
    description:
      'A title sequence study for an unmade thriller. Long lens parallax, kinetic serif typography and an unhurried camera that lets tension build through composition rather than cut.',
    thumbnail: 'https://images.unsplash.com/photo-1637946175559-22c4fe13fc54?w=1600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    software: ['After Effects', 'Cinema 4D', 'DaVinci Resolve'],
    credits: 'Direction & Design — Movaro',
    links: {
      vimeo: 'https://vimeo.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'orbital-form',
    title: 'Orbital Form',
    category: '3D / Motion Study',
    year: '2024',
    description:
      'An exploration of repetition, rotation and the dignity of a single shape. Each loop is a meditation — minimal palette, exacting timing, and a quiet sense of inevitability.',
    thumbnail: 'https://images.unsplash.com/photo-1632059368252-be6d65abc4e2?w=1600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    software: ['Cinema 4D', 'Octane'],
    credits: 'All work — Movaro',
    links: {
      behance: 'https://behance.net',
      drive: 'https://drive.google.com'
    }
  },
  {
    id: 'gilded-frame',
    title: 'Gilded Frame',
    category: 'Editorial Motion',
    year: '2023',
    description:
      'A motion editorial inspired by the architecture of jewellery — chiseled forms, soft caustics and a single muted gold accent threaded through every frame.',
    thumbnail: 'https://images.unsplash.com/photo-1633269540827-728aabbb7646?w=1600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    software: ['Blender', 'After Effects'],
    credits: 'Direction — Movaro · Score — Field Notes',
    links: {
      website: 'https://example.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'umbra',
    title: 'Umbra',
    category: 'Cinematic Loop',
    year: '2023',
    description:
      'Light as a character. A study of a single beam carving form out of darkness — restrained, theatrical, and built to loop seamlessly on a gallery wall.',
    thumbnail: 'https://images.pexels.com/photos/4722576/pexels-photo-4722576.jpeg?auto=compress&w=1600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    software: ['Houdini', 'Nuke', 'DaVinci Resolve'],
    credits: 'Direction — Movaro',
    links: {
      vimeo: 'https://vimeo.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
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
