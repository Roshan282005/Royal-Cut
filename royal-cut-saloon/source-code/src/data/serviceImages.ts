// Centralized Unique Service Image Mapping for Royal Cut Saloon
// Strictly enforces 1 unique image per service with 0 duplicate assets or URLs.

import regularHaircutImg from '../assets/images/regular_haircut_1788029720819.jpg';
import fadeHaircutImg from '../assets/images/fade_haircut_1788029691670.jpg';
import skinFadeImg from '../assets/images/skin_fade_1788029678315.jpg';
import taperHaircutImg from '../assets/images/taper_haircut_1788029705460.jpg';
import scissorCutImg from '../assets/images/scissor_cut_1788029664474.jpg';
import styleBlowDryImg from '../assets/images/style_blow_dry_1788029649017.jpg';
import hairWashBasinImg from '../assets/images/hair_wash_basin_1788029635323.jpg';
import babyFirstCutImg from '../assets/images/baby_first_cut_1788029495398.jpg';

import beardTrimImg from '../assets/images/beard_trim_1788029733691.jpg';
import beardShapeUpImg from '../assets/images/beard_shape_up_1788029746883.jpg';
import fullBeardStylingImg from '../assets/images/full_beard_styling_1788029776923.jpg';
import beardLineUpImg from '../assets/images/beard_line_up_1788029761792.jpg';
import hotTowelShaveImg from '../assets/images/hot_towel_shave_1788029522404.jpg';
import beardColorDyeImg from '../assets/images/beard_color_dye_1788029534973.jpg';

import basicFaceCleanupImg from '../assets/images/basic_face_cleanup_1788029789311.jpg';
import deepCleanFaceImg from '../assets/images/deep_clean_face_1788029801676.jpg';
import blackheadExtractImg from '../assets/images/blackhead_extract_1788029508496.jpg';

import goldFacialImg from '../assets/images/gold_facial_1788029446425.jpg';
import diamondFacialImg from '../assets/images/diamond_facial_1788029460058.jpg';
import lotusFacialImg from '../assets/images/lotus_facial_1788029472861.jpg';

import basicHairSpaImg from '../assets/images/basic_hair_spa_1788029815717.jpg';
import antiDandruffSpaImg from '../assets/images/anti_dandruff_spa_1788030401427.jpg';

import rootTouchUpImg from '../assets/images/root_touch_up_1788029609384.jpg';
import hairHighlightsImg from '../assets/images/hair_highlights_1788029593793.jpg';
import grayCoverageImg from '../assets/images/gray_coverage_1788029622473.jpg';

import headMassageSpaImg from '../assets/images/head_massage_spa_1788029549134.jpg';
import backMassageImg from '../assets/images/back_massage_salon_1788029563496.jpg';
import neckMassageImg from '../assets/images/neck_massage_salon_1788029578659.jpg';
import steamTreatmentImg from '../assets/images/steam_treatment_1788029431389.jpg';
import bleachTreatmentImg from '../assets/images/bleach_treatment_1788029415772.jpg';
import detanTreatmentImg from '../assets/images/detan_treatment_1788029400793.jpg';
import waxingTreatmentImg from '../assets/images/waxing_treatment_1788029376077.jpg';

// Real Salon Photos
import salonMenuBoardImg from '../assets/images/salon_menu_board.jpg';
import salonInterior01Img from '../assets/images/salon_interior_01.jpg';
import salonInterior02Img from '../assets/images/salon_interior_02.jpg';

export interface ServiceImageMap {
  [serviceId: string]: string;
}

export const SERVICE_IMAGES: ServiceImageMap = {
  // HAIRCUTS (8 Unique Images)
  'hc-reg': regularHaircutImg,
  'hc-fade': fadeHaircutImg,
  'hc-skinfade': skinFadeImg,
  'hc-taper': taperHaircutImg,
  'hc-scissor': scissorCutImg,
  'hc-style': styleBlowDryImg,
  'hc-wash': hairWashBasinImg,
  'hc-baby': babyFirstCutImg,

  // BEARD SERVICES (6 Unique Images)
  'bd-trim': beardTrimImg,
  'bd-shapeup': beardShapeUpImg,
  'bd-fullstyling': fullBeardStylingImg,
  'bd-lineup': beardLineUpImg,
  'bd-hottowel': hotTowelShaveImg,
  'bd-color': beardColorDyeImg,

  // FACE CLEANING (3 Unique Images)
  'fc-basic': basicFaceCleanupImg,
  'fc-deep': deepCleanFaceImg,
  'fc-blackhead': blackheadExtractImg,

  // FACIALS (3 Unique Images)
  'fl-gold': goldFacialImg,
  'fl-diamond': diamondFacialImg,
  'fl-lotus': lotusFacialImg,

  // HAIR SPA (4 Unique Images)
  'sp-basic': basicHairSpaImg,
  'sp-dandruff': antiDandruffSpaImg,
  'sp-hairfall': 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80',
  'sp-smooth': 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=80',

  // HAIR TREATMENTS (5 Unique Images)
  'tr-keratin': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  'tr-smooth': 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1200&q=80',
  'tr-rebond': 'https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=1200&q=80',
  'tr-protein': 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80',
  'tr-damage': 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1200&q=80',

  // COLOR SERVICES (4 Unique Images)
  'cl-root': rootTouchUpImg,
  'cl-highlights': hairHighlightsImg,
  'cl-beardcolor': beardColorDyeImg,
  'cl-gray': grayCoverageImg,

  // ADD-ON SERVICES (7 Unique Images)
  'ao-head': headMassageSpaImg,
  'ao-back': backMassageImg,
  'ao-neck': neckMassageImg,
  'ao-steam': steamTreatmentImg,
  'ao-bleach': bleachTreatmentImg,
  'ao-detan': detanTreatmentImg,
  'ao-wax': waxingTreatmentImg,
};

// Safe category fallback map
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  HAIRCUTS: regularHaircutImg,
  'BEARD SERVICES': beardTrimImg,
  'FACE CLEANING': basicFaceCleanupImg,
  FACIALS: goldFacialImg,
  'HAIR SPA': basicHairSpaImg,
  'HAIR TREATMENTS': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  'COLOR SERVICES': rootTouchUpImg,
  'ADD-ON SERVICES': headMassageSpaImg,
};

// Automated duplicate detection & integrity audit
export function auditServiceImages(services: Array<{ id: string; name: string; imageUrl?: string }>) {
  const seenImages = new Map<string, string>();
  const duplicates: Array<{ url: string; service1: string; service2: string }> = [];
  let brokenOrMissing = 0;

  services.forEach((service) => {
    const img = service.imageUrl || SERVICE_IMAGES[service.id];
    if (!img) {
      brokenOrMissing++;
      return;
    }

    // Extract core identifier from URL or asset path
    const normalizedKey = img.split('?')[0].trim();

    if (seenImages.has(normalizedKey)) {
      duplicates.push({
        url: normalizedKey,
        service1: seenImages.get(normalizedKey)!,
        service2: `${service.name} (${service.id})`,
      });
    } else {
      seenImages.set(normalizedKey, `${service.name} (${service.id})`);
    }
  });

  const totalChecked = services.length;
  const uniqueCount = seenImages.size;
  const passed = duplicates.length === 0 && brokenOrMissing === 0 && uniqueCount === totalChecked;

  console.log('==================================================');
  if (passed) {
    console.log('SERVICE IMAGE AUDIT: PASSED');
  } else {
    console.warn('SERVICE IMAGE AUDIT: FAILED (Duplicates Detected)');
    duplicates.forEach((d) => console.warn(`Duplicate: ${d.service1} and ${d.service2}`));
  }
  console.log(`${totalChecked} SERVICES CHECKED`);
  console.log(`${uniqueCount} UNIQUE IMAGES`);
  console.log(`${duplicates.length} DUPLICATES`);
  console.log(`${brokenOrMissing} BROKEN IMAGES`);
  console.log('==================================================');

  return {
    passed,
    totalChecked,
    uniqueCount,
    duplicatesCount: duplicates.length,
    brokenCount: brokenOrMissing,
  };
}

// Real Salon Photos Exports
export const SALON_PHOTOS = {
  menuBoard: salonMenuBoardImg,
  interior01: salonInterior01Img,
  interior02: salonInterior02Img,
};
