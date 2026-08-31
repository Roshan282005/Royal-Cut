import React, { useState } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandStatement } from './components/BrandStatement';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { PackageSection } from './components/PackageSection';
import { MembershipSection } from './components/MembershipSection';
import { MastersSection } from './components/MastersSection';
import { GallerySection } from './components/GallerySection';
import { SalonTourSection } from './components/SalonTourSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { LocationSection } from './components/LocationSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceItem, PackageItem, MasterBarber } from './types';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingBarberId, setBookingBarberId] = useState<string | undefined>(undefined);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('ALL');

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setBookingServiceId(serviceId);
    setBookingBarberId(barberId);
    setIsBookingOpen(true);
  };

  const handleBookService = (service: ServiceItem) => {
    handleOpenBooking(service.id, undefined);
  };

  const handleBookPackage = (pkg: PackageItem) => {
    handleOpenBooking(pkg.id, undefined);
  };

  const handleBookWithMaster = (master: MasterBarber) => {
    handleOpenBooking(undefined, master.id);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#08080a] text-[#e4e4e7] selection:bg-[#c5a059]/30 selection:text-[#f8ecd4] relative">
        {/* Luxury Custom Cursor */}
        <CustomCursor />

        {/* Short Luxury Loading Screen */}
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />

        {/* Main App */}
        <Navbar onOpenBooking={() => handleOpenBooking()} />

        <main className="w-full">
          {/* HERO: The Main 3D WOW Moment */}
          <HeroSection onOpenBooking={() => handleOpenBooking()} />

          {/* SECTION 02: Brand Statement (The Royal Standard) */}
          <BrandStatement />

          {/* SECTION 03: The Experience (4 Pillars) */}
          <ExperienceSection
            onSelectCategory={(cat) => setSelectedServiceCategory(cat)}
          />

          {/* SECTION 04: Services Menu */}
          <ServicesSection
            selectedCategory={selectedServiceCategory}
            onSelectCategory={setSelectedServiceCategory}
            onBookService={handleBookService}
          />

          {/* SECTION 05: Royal Collection (3D Package Cards) */}
          <PackageSection onBookPackage={handleBookPackage} />

          {/* SECTION 06: Royal Club (3D Metallic Membership Card) */}
          <MembershipSection />

          {/* SECTION 07: The Masters */}
          <MastersSection onBookWithMaster={handleBookWithMaster} />

          {/* SECTION 08: Gallery & Transformations */}
          <GallerySection />

          {/* SECTION 09: Salon 3D Architectural Visualization */}
          <SalonTourSection />

          {/* SECTION 10: Testimonials */}
          <TestimonialsSection />

          {/* SECTION 11: Instagram */}
          <InstagramSection />

          {/* SECTION 12: Location & Contact */}
          <LocationSection />

          {/* Final Cinematic 3D CTA */}
          <FinalCTA onOpenBooking={() => handleOpenBooking()} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Universal High-Converting Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialServiceId={bookingServiceId}
          initialBarberId={bookingBarberId}
        />
      </div>
    </SmoothScroll>
  );
}
