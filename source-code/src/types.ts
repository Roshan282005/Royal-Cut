export interface ServiceItem {
  id: string;
  name: string;
  category: 'HAIRCUTS' | 'BEARD' | 'FACE' | 'FACIALS' | 'SPA & TREATMENT' | 'COLOR' | 'ADD-ONS' | string;
  categoryLabel?: string;
  price: number;
  duration: string;
  description: string;
  imageUrl?: string;
  highlighted?: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  includedServices: string[];
  isPopular?: boolean;
  tagline: string;
  imageUrl?: string;
}

export interface MasterBarber {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  availableDays: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'HAIR' | 'FADE' | 'BEARD' | 'GROOMING' | 'SALON' | 'TRANSFORMATIONS';
  imageUrl: string;
  beforeImageUrl?: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  quote: string;
  service: string;
  date: string;
  rating: number;
}

export interface BookingData {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
}
