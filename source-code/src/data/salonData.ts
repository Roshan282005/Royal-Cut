import { ServiceItem, PackageItem, MasterBarber, GalleryItem, TestimonialItem } from '../types';
import { SERVICE_IMAGES, SALON_PHOTOS } from './serviceImages';

export const SALON_INFO = {
  name: 'ROYAL CUT SALOON',
  tagline: 'LOOK GOOD, FEEL ROYAL',
  address: '2242 Hempstead Tpke, East Meadow, NY 11554',
  phone: '+1 (929) 631-7602',
  phoneRaw: '+19296317602',
  hours: 'Open Daily: 9:00 AM – 10:00 PM',
  instagram: '@royal.cutsaloon',
  instagramUrl: 'https://instagram.com/royal.cutsaloon',
  googleMapsUrl: 'https://maps.google.com/?q=2242+Hempstead+Tpke,+East+Meadow,+NY+11554',
  coordinates: { lat: 40.7259, lng: -73.5558 }
};

export const SERVICES_DATA: ServiceItem[] = [
  // HAIRCUTS
  {
    id: 'hc-reg',
    name: 'Regular Haircut',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 20,
    duration: '30 min',
    imageUrl: SERVICE_IMAGES['hc-reg'],
    description: 'A tailored classic haircut shaped to your natural hair flow and personal style.'
  },
  {
    id: 'hc-fade',
    name: 'Fade Haircut',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 20,
    duration: '35 min',
    imageUrl: SERVICE_IMAGES['hc-fade'],
    description: 'Clean transitions, precise detailing and a finish tailored to your style.'
  },
  {
    id: 'hc-skinfade',
    name: 'Skin Fade',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 20,
    duration: '40 min',
    imageUrl: SERVICE_IMAGES['hc-skinfade'],
    description: 'Seamless razor-to-skin transitions with sharp perimeter geometry and clean contours.'
  },
  {
    id: 'hc-taper',
    name: 'Taper Haircut',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 20,
    duration: '30 min',
    imageUrl: SERVICE_IMAGES['hc-taper'],
    description: 'Subtle sideburn and neckline gradient preserving natural density and classic form.'
  },
  {
    id: 'hc-scissor',
    name: 'Scissor Cut',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 20,
    duration: '40 min',
    imageUrl: SERVICE_IMAGES['hc-scissor'],
    description: 'Handcrafted shear technique creating natural weight distribution and layered texture.'
  },
  {
    id: 'hc-style',
    name: 'Style & Blow Dry',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 5,
    duration: '15 min',
    imageUrl: SERVICE_IMAGES['hc-style'],
    description: 'Professional blow dry and thermal styling finished with premium grooming paste.'
  },
  {
    id: 'hc-wash',
    name: 'Hair Wash',
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 5,
    duration: '10 min',
    imageUrl: SERVICE_IMAGES['hc-wash'],
    description: 'Invigorating scalp cleanse with cooling shampoo and conditioning rinse.'
  },
  {
    id: 'hc-baby',
    name: "Baby's First Royal Cut",
    category: 'HAIRCUTS',
    categoryLabel: 'HAIRCUTS',
    price: 100,
    duration: '45 min',
    imageUrl: SERVICE_IMAGES['hc-baby'],
    description: 'A gentle milestone haircut ceremony featuring patient styling, a keepsake lock of hair, and certificate.',
    highlighted: true
  },

  // BEARD SERVICES
  {
    id: 'bd-trim',
    name: 'Beard Trim',
    category: 'BEARD SERVICES',
    categoryLabel: 'BEARD SERVICES',
    price: 15,
    duration: '20 min',
    imageUrl: SERVICE_IMAGES['bd-trim'],
    description: 'Even bulk reduction, mustache balancing, and contour sculpting with precision trimmers.'
  },
  {
    id: 'bd-shapeup',
    name: 'Beard Shape Up',
    category: 'BEARD SERVICES',
    categoryLabel: 'BEARD SERVICES',
    price: 15,
    duration: '20 min',
    imageUrl: SERVICE_IMAGES['bd-shapeup'],
    description: 'Sharp boundary definition along cheekbones, jawline, and neckline.'
  },
  {
    id: 'bd-fullstyling',
    name: 'Full Beard Styling',
    category: 'BEARD SERVICES',
    categoryLabel: 'BEARD SERVICES',
    price: 15,
    duration: '25 min',
    imageUrl: SERVICE_IMAGES['bd-fullstyling'],
    description: 'Precision shaping, detailed finishing and a refined silhouette designed around your features.'
  },
  {
    id: 'bd-lineup',
    name: 'Beard Line Up',
    category: 'BEARD SERVICES',
    categoryLabel: 'BEARD SERVICES',
    price: 15,
    duration: '15 min',
    imageUrl: SERVICE_IMAGES['bd-lineup'],
    description: 'Close-up precision edge work and crisp perimeter detailing.'
  },
  {
    id: 'bd-hottowel',
    name: 'Hot Towel Shave',
    category: 'BEARD SERVICES',
    categoryLabel: 'BEARD SERVICES',
    price: 20,
    duration: '30 min',
    imageUrl: SERVICE_IMAGES['bd-hottowel'],
    description: 'A traditional grooming ritual finished with warm towels and precision razor work.'
  },
  {
    id: 'bd-color',
    name: 'Beard Color',
    category: 'BEARD SERVICES',
    categoryLabel: 'BEARD SERVICES',
    price: 20,
    duration: '25 min',
    imageUrl: SERVICE_IMAGES['bd-color'],
    description: 'Natural pigment blending to reduce patchy gray and intensify beard depth.'
  },

  // FACE CLEANING
  {
    id: 'fc-basic',
    name: 'Basic Face Clean Up',
    category: 'FACE CLEANING',
    categoryLabel: 'FACE CLEANING',
    price: 15,
    duration: '20 min',
    imageUrl: SERVICE_IMAGES['fc-basic'],
    description: 'Professional facial cleansing, light exfoliation polish, and balancing hydration.'
  },
  {
    id: 'fc-deep',
    name: 'Deep Clean',
    category: 'FACE CLEANING',
    categoryLabel: 'FACE CLEANING',
    price: 20,
    duration: '30 min',
    imageUrl: SERVICE_IMAGES['fc-deep'],
    description: 'Intensive pore cleansing with warm steam, clarifying mask, and refreshing toner.'
  },
  {
    id: 'fc-blackhead',
    name: 'Blackhead Removal',
    category: 'FACE CLEANING',
    categoryLabel: 'FACE CLEANING',
    price: 20,
    duration: '25 min',
    imageUrl: SERVICE_IMAGES['fc-blackhead'],
    description: 'Targeted T-zone and nose pore extraction with soothing botanical toner.'
  },

  // FACIALS
  {
    id: 'fl-gold',
    name: 'Gold Facial',
    category: 'FACIALS',
    categoryLabel: 'FACIALS',
    price: 80,
    duration: '50 min',
    imageUrl: SERVICE_IMAGES['fl-gold'],
    description: 'Revitalizing gold-infused facial treatment designed to restore tone, elasticity, and subtle radiance.'
  },
  {
    id: 'fl-diamond',
    name: 'Diamond Facial',
    category: 'FACIALS',
    categoryLabel: 'FACIALS',
    price: 100,
    duration: '60 min',
    imageUrl: SERVICE_IMAGES['fl-diamond'],
    description: 'Exfoliating diamond crystal polish, facial massage, and intensive brightening treatment.'
  },
  {
    id: 'fl-lotus',
    name: 'Lotus Facial',
    category: 'FACIALS',
    categoryLabel: 'FACIALS',
    price: 120,
    duration: '70 min',
    imageUrl: SERVICE_IMAGES['fl-lotus'],
    description: 'Botanical lotus facial therapy with deep hydration, facial massage, and cooling finish.'
  },

  // HAIR SPA
  {
    id: 'sp-basic',
    name: 'Basic Hair Spa',
    category: 'HAIR SPA',
    categoryLabel: 'HAIR SPA',
    price: 50,
    duration: '40 min',
    imageUrl: SERVICE_IMAGES['sp-basic'],
    description: 'Deep hair fiber nourishing cream massage, warm steam, and conditioning mask.'
  },
  {
    id: 'sp-dandruff',
    name: 'Anti Dandruff Spa',
    category: 'HAIR SPA',
    categoryLabel: 'HAIR SPA',
    price: 70,
    duration: '50 min',
    imageUrl: SERVICE_IMAGES['sp-dandruff'],
    description: 'Purifying scalp treatment to soothe flaking, remove buildup, and balance scalp health.'
  },
  {
    id: 'sp-hairfall',
    name: 'Hair Fall Control Spa',
    category: 'HAIR SPA',
    categoryLabel: 'HAIR SPA',
    price: 70,
    duration: '50 min',
    imageUrl: SERVICE_IMAGES['sp-hairfall'],
    description: 'Targeted scalp and follicle massage to nourish roots and strengthen hair.'
  },
  {
    id: 'sp-smooth',
    name: 'Smoothening Spa',
    category: 'HAIR SPA',
    categoryLabel: 'HAIR SPA',
    price: 50,
    duration: '45 min',
    imageUrl: SERVICE_IMAGES['sp-smooth'],
    description: 'Conditioning mask and cuticle sealant to eliminate frizz and restore soft shine.'
  },

  // HAIR TREATMENTS
  {
    id: 'tr-keratin',
    name: 'Keratin Treatment',
    category: 'HAIR TREATMENTS',
    categoryLabel: 'HAIR TREATMENTS',
    price: 80,
    duration: '60 min',
    imageUrl: SERVICE_IMAGES['tr-keratin'],
    description: 'Professional keratin infusion for smooth, manageable, and frizz-resistant hair.'
  },
  {
    id: 'tr-smooth',
    name: 'Smoothening Treatment',
    category: 'HAIR TREATMENTS',
    categoryLabel: 'HAIR TREATMENTS',
    price: 80,
    duration: '60 min',
    imageUrl: SERVICE_IMAGES['tr-smooth'],
    description: 'Thermal conditioning treatment formulation for sleek texture and control.'
  },
  {
    id: 'tr-rebond',
    name: 'Rebonding Treatment',
    category: 'HAIR TREATMENTS',
    categoryLabel: 'HAIR TREATMENTS',
    price: 80,
    duration: '75 min',
    imageUrl: SERVICE_IMAGES['tr-rebond'],
    description: 'Structural hair bond restructuring treatment for long-lasting straight texture.'
  },
  {
    id: 'tr-protein',
    name: 'Protein Treatment',
    category: 'HAIR TREATMENTS',
    categoryLabel: 'HAIR TREATMENTS',
    price: 80,
    duration: '50 min',
    imageUrl: SERVICE_IMAGES['tr-protein'],
    description: 'Deep protein conditioning treatment to strengthen weak or processed hair.'
  },
  {
    id: 'tr-damage',
    name: 'Damage Repair Treatment',
    category: 'HAIR TREATMENTS',
    categoryLabel: 'HAIR TREATMENTS',
    price: 80,
    duration: '55 min',
    imageUrl: SERVICE_IMAGES['tr-damage'],
    description: 'Intensive restorative therapy to rebuild moisture and repair damaged hair fibers.'
  },

  // COLOR SERVICES
  {
    id: 'cl-root',
    name: 'Root Touch Up',
    category: 'COLOR SERVICES',
    categoryLabel: 'COLOR SERVICES',
    price: 20,
    duration: '35 min',
    imageUrl: SERVICE_IMAGES['cl-root'],
    description: 'Seamless new growth blending and color matching for clean, consistent tone.'
  },
  {
    id: 'cl-highlights',
    name: 'Hair Highlights',
    category: 'COLOR SERVICES',
    categoryLabel: 'COLOR SERVICES',
    price: 75,
    duration: '60 min',
    imageUrl: SERVICE_IMAGES['cl-highlights'],
    description: 'Precision highlights for dimensional tone, texture, and visual depth.'
  },
  {
    id: 'cl-beardcolor',
    name: 'Beard Color',
    category: 'COLOR SERVICES',
    categoryLabel: 'COLOR SERVICES',
    price: 20,
    duration: '25 min',
    imageUrl: SERVICE_IMAGES['cl-beardcolor'],
    description: 'Fast-acting beard color application matching natural head and temple hair tones.'
  },
  {
    id: 'cl-gray',
    name: 'Gray Coverage',
    category: 'COLOR SERVICES',
    categoryLabel: 'COLOR SERVICES',
    price: 15,
    duration: '25 min',
    imageUrl: SERVICE_IMAGES['cl-gray'],
    description: 'Natural gray reduction and tone blending for a clean, youthful appearance.'
  },

  // ADD-ON SERVICES
  {
    id: 'ao-head',
    name: 'Head Massage',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 10,
    duration: '15 min',
    imageUrl: SERVICE_IMAGES['ao-head'],
    description: 'Relaxing scalp and temple massage to relieve tension and boost circulation.'
  },
  {
    id: 'ao-back',
    name: 'Back Massage',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 10,
    duration: '15 min',
    imageUrl: SERVICE_IMAGES['ao-back'],
    description: 'Targeted upper back and shoulder massage to release muscular tension.'
  },
  {
    id: 'ao-neck',
    name: 'Neck Massage',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 10,
    duration: '10 min',
    imageUrl: SERVICE_IMAGES['ao-neck'],
    description: 'Focused neck and trapezius massage with soothing muscle lotion.'
  },
  {
    id: 'ao-steam',
    name: 'Steam',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 10,
    duration: '10 min',
    imageUrl: SERVICE_IMAGES['ao-steam'],
    description: 'Warm facial steam treatment for deep pore opening and relaxation.'
  },
  {
    id: 'ao-bleach',
    name: 'Bleach',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 20,
    duration: '20 min',
    imageUrl: SERVICE_IMAGES['ao-bleach'],
    description: 'Professional facial hair matching formulation for unified skin and tone appearance.'
  },
  {
    id: 'ao-detan',
    name: 'Detan',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 20,
    duration: '20 min',
    imageUrl: SERVICE_IMAGES['ao-detan'],
    description: 'Targeted detan facial treatment to reduce sun exposure and refresh the complexion.'
  },
  {
    id: 'ao-wax',
    name: 'Waxing (Nose/Ears/Face)',
    category: 'ADD-ON SERVICES',
    categoryLabel: 'ADD-ON SERVICES',
    price: 15,
    duration: '15 min',
    imageUrl: SERVICE_IMAGES['ao-wax'],
    description: 'Professional waxing treatment for unwanted ear, nose, and facial hair.'
  }
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-classic',
    name: 'CLASSIC',
    price: 60,
    duration: '1h 15m',
    tagline: 'Essential Gentlemen’s Protocol',
    description: 'Haircut + Beard Trim + Face Clean Up + Hair Wash',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    includedServices: [
      'Precision Haircut & Style',
      'Sculpted Beard Trim',
      'Basic Face Clean Up',
      'Hair Wash'
    ]
  },
  {
    id: 'pkg-royal',
    name: 'ROYAL',
    price: 90,
    duration: '1h 45m',
    tagline: 'Signature Heritage Ritual',
    description: 'Haircut + Beard + Face Clean Up + Hair Spa + Head Massage',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80',
    includedServices: [
      'Haircut',
      'Beard',
      'Face Clean Up',
      'Hair Spa',
      'Head Massage'
    ],
    isPopular: true
  },
  {
    id: 'pkg-premium',
    name: 'PREMIUM',
    price: 130,
    duration: '2h 15m',
    tagline: 'Full Sensory Restoration',
    description: 'Haircut + Beard + Face Clean Up + Hair Spa + Head & Back Massage + Steam',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    includedServices: [
      'Haircut',
      'Beard',
      'Face Clean Up',
      'Hair Spa',
      'Head & Back Massage',
      'Steam'
    ]
  },
  {
    id: 'pkg-deluxe',
    name: 'DELUXE',
    price: 160,
    duration: '2h 45m',
    tagline: 'Color Artistry & Grooming',
    description: 'Haircut + Beard + Hair Color + Face Clean Up + Hair Spa + Head Massage',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    includedServices: [
      'Haircut',
      'Beard',
      'Hair Color',
      'Face Clean Up',
      'Hair Spa',
      'Head Massage'
    ]
  },
  {
    id: 'pkg-ultimate',
    name: 'ULTIMATE',
    price: 180,
    duration: '3h 15m',
    tagline: 'The Pinnacle Masterpiece',
    description: 'Haircut + Beard + Hair Color + Detan + Facial + Hair Spa + Head & Back Massage',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    includedServices: [
      'Haircut',
      'Beard',
      'Hair Color',
      'Detan',
      'Facial',
      'Hair Spa',
      'Head & Back Massage'
    ]
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'High Razor Skin Fade & Crop',
    category: 'FADE',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Zero foil transition fade with textured crop top and crisp temple geometry.'
  },
  {
    id: 'gal-2',
    title: 'Bespoke Executive Beard Sculpt',
    category: 'BEARD',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Defined cheek lines, natural mustache balance, and hot towel herbal hydration.'
  },
  {
    id: 'gal-3',
    title: 'Signature Scissor Cut & Matte Finish',
    category: 'HAIR',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Natural medium-length flow with hand-crafted weight reduction.'
  },
  {
    id: 'gal-4',
    title: 'Low Drop Taper & Razor Detailing',
    category: 'FADE',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Smooth gradient taper around the ears with clean neckline curvature.'
  },
  {
    id: 'gal-5',
    title: '24K Gold Facial & Extraction',
    category: 'GROOMING',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cellular revitalizing gold mask with pore purification and cryo massage.'
  },
  {
    id: 'gal-6',
    title: 'The Royal Chair Lounge',
    category: 'SALON',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    caption: 'Custom black leather and chrome Belmont chairs with ambient marble station lighting.'
  },
  {
    id: 'gal-7',
    title: 'Total Executive Taper Transformation',
    category: 'TRANSFORMATIONS',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Complete overhaul: tailored scissor crop, graduated low taper, and beard alignment.'
  },
  {
    id: 'gal-8',
    title: 'Hair Texture & Dimensional Separation',
    category: 'HAIR',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hand point-cutting and sea-salt clay for weightless, sculpted movement.'
  },
  {
    id: 'gal-9',
    title: 'Royal Cut Salon Services Menu',
    category: 'SALON',
    imageUrl: SALON_PHOTOS.menuBoard,
    caption: 'Complete menu of premium grooming services from classic haircuts to luxury spa treatments.'
  },
  {
    id: 'gal-10',
    title: 'Modern Royal Salon Interior',
    category: 'SALON',
    imageUrl: SALON_PHOTOS.interior01,
    caption: 'State-of-the-art barber chairs with hexagonal LED ceiling design and premium ambient lighting.'
  },
  {
    id: 'gal-11',
    title: 'Executive Grooming Sanctuary',
    category: 'SALON',
    imageUrl: SALON_PHOTOS.interior02,
    caption: 'Luxurious salon environment with professional-grade stations and sophisticated styling lounge.'
  }
];

// NOTE: Fabricated testimonials and Instagram-post engagement stats were removed here
// (see conversation) — do not re-add invented reviews or fake like/comment counts.
// Real testimonials can be added as TestimonialItem objects once the client has them,
// or wire up a live Google Reviews embed using the shop's Google Place ID.
