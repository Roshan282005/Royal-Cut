import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar as CalendarIcon, Clock, User, Scissors, ShieldCheck, ChevronRight, ChevronLeft, Phone, Mail, Sparkles, Download } from 'lucide-react';
import { SERVICES_DATA, PACKAGES_DATA, MASTERS_DATA, SALON_INFO } from '../data/salonData';
import { ServiceItem, PackageItem, MasterBarber } from '../types';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialBarberId?: string;
}

const TIME_SLOTS = [
  '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
  '08:00 PM', '09:00 PM'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialBarberId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [bookingType, setBookingType] = useState<'SERVICE' | 'PACKAGE'>('SERVICE');
  
  // Selections
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    SERVICES_DATA.find((s) => s.id === initialServiceId) || SERVICES_DATA[0]
  );
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(
    PACKAGES_DATA[1] // Royal package default
  );
  const [selectedBarber, setSelectedBarber] = useState<MasterBarber | null>(
    MASTERS_DATA.find((m) => m.id === initialBarberId) || null
  );
  
  // Date & Time
  const today = new Date();
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      fullDate: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      monthDay: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[2]);

  // Client Info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initial selections if modal opens with props
  React.useEffect(() => {
    if (initialServiceId) {
      const s = SERVICES_DATA.find((item) => item.id === initialServiceId);
      if (s) {
        setSelectedService(s);
        setBookingType('SERVICE');
      }
    }
    if (initialBarberId) {
      const b = MASTERS_DATA.find((item) => item.id === initialBarberId);
      if (b) setSelectedBarber(b);
    }
  }, [initialServiceId, initialBarberId]);

  const activeItemName = bookingType === 'SERVICE' ? selectedService?.name : selectedPackage?.name;
  const activeItemPrice = bookingType === 'SERVICE' ? selectedService?.price : selectedPackage?.price;
  const activeItemDuration = bookingType === 'SERVICE' ? selectedService?.duration : selectedPackage?.duration;

  const handleNextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#deb86a', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleDownloadCalendar = () => {
    const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Royal Cut Saloon//Appointment Booking//EN
BEGIN:VEVENT
SUMMARY:Royal Cut Saloon Appointment - ${activeItemName}
DESCRIPTION:Master Grooming Appointment at Royal Cut Saloon with ${selectedBarber ? selectedBarber.name : 'Master Barber'}.
LOCATION:${SALON_INFO.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `royal-cut-booking-${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#101014] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-800/80 flex items-center justify-between bg-[#14141a]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase font-bold">
                  RESERVATION CONCIERGE
                </span>
              </div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white uppercase">
                {isSubmitted ? 'RESERVATION REQUEST CONFIRMED' : 'BOOK YOUR ROYAL EXPERIENCE'}
              </h3>
            </div>

            <button
              onClick={onClose}
              id="close-booking-modal-btn"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSubmitted && (
            <>
              {/* Step indicator breadcrumbs */}
              <div className="px-6 py-3 bg-[#0d0d10] border-b border-zinc-800/50 flex items-center justify-between text-xs overflow-x-auto no-scrollbar">
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Barber' },
                  { num: 3, label: 'Date' },
                  { num: 4, label: 'Time' },
                  { num: 5, label: 'Confirm' },
                ].map((s) => (
                  <div
                    key={s.num}
                    onClick={() => s.num < step && setStep(s.num)}
                    className={`flex items-center gap-1.5 cursor-pointer ${
                      step === s.num
                        ? 'text-[#c5a059] font-bold'
                        : s.num < step
                        ? 'text-zinc-300'
                        : 'text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                        step === s.num
                          ? 'bg-[#c5a059] text-black font-bold'
                          : s.num < step
                          ? 'bg-zinc-800 text-zinc-300'
                          : 'bg-zinc-900 text-zinc-600'
                      }`}
                    >
                      {s.num < step ? <Check className="w-3 h-3" /> : s.num}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Step Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                
                {/* STEP 01: Choose Service or Package */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 p-1 rounded-lg bg-[#181820] border border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setBookingType('SERVICE')}
                        className={`flex-1 py-2 text-xs font-serif-display tracking-wider uppercase rounded-md transition-all ${
                          bookingType === 'SERVICE'
                            ? 'bg-[#c5a059] text-black font-bold'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Individual Services
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingType('PACKAGE')}
                        className={`flex-1 py-2 text-xs font-serif-display tracking-wider uppercase rounded-md transition-all ${
                          bookingType === 'PACKAGE'
                            ? 'bg-[#c5a059] text-black font-bold'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Curated Packages
                      </button>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {bookingType === 'SERVICE' ? (
                        SERVICES_DATA.map((service) => (
                          <div
                            key={service.id}
                            id={`select-service-${service.id}`}
                            onClick={() => setSelectedService(service)}
                            className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                              selectedService?.id === service.id
                                ? 'bg-[#1b1914] border-[#c5a059] shadow-md'
                                : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <div className="pr-4">
                              <span className="text-[10px] font-mono tracking-wider text-[#c5a059] uppercase block">
                                {service.category}
                              </span>
                              <h4 className="font-serif-display text-sm font-bold text-white uppercase">
                                {service.name}
                              </h4>
                              <p className="text-xs text-zinc-400 line-clamp-1">{service.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-serif-display text-base font-bold text-[#c5a059]">
                                ${service.price}
                              </span>
                              <span className="text-[10px] text-zinc-500 block">{service.duration}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        PACKAGES_DATA.map((pkg) => (
                          <div
                            key={pkg.id}
                            id={`select-pkg-${pkg.id}`}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                              selectedPackage?.id === pkg.id
                                ? 'bg-[#1b1914] border-[#c5a059] shadow-md'
                                : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-serif-display text-base font-bold text-white uppercase">
                                  {pkg.name}
                                </h4>
                                {pkg.isPopular && (
                                  <span className="px-2 py-0.5 rounded bg-[#c5a059] text-black text-[9px] font-bold">
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-zinc-400 mt-0.5">{pkg.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-serif-display text-lg font-bold text-[#c5a059]">
                                ${pkg.price}
                              </span>
                              <span className="text-[10px] text-zinc-500 block">{pkg.duration}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 02: Choose Barber */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400 mb-2">
                      Select your preferred master artisan or let our concierge assign the first available craftsman.
                    </p>

                    {/* Any available barber option */}
                    <div
                      onClick={() => setSelectedBarber(null)}
                      id="select-barber-any"
                      className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        selectedBarber === null
                          ? 'bg-[#1b1914] border-[#c5a059]'
                          : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#c5a059]">
                          <Scissors className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-serif-display text-sm font-bold text-white uppercase">
                            First Available Master Barber
                          </h4>
                          <p className="text-xs text-zinc-400">Guaranteed highest standard of precision</p>
                        </div>
                      </div>
                      {selectedBarber === null && <Check className="w-5 h-5 text-[#c5a059]" />}
                    </div>

                    {/* Barber List */}
                    {MASTERS_DATA.map((master) => (
                      <div
                        key={master.id}
                        id={`select-barber-${master.id}`}
                        onClick={() => setSelectedBarber(master)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          selectedBarber?.id === master.id
                            ? 'bg-[#1b1914] border-[#c5a059]'
                            : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={master.avatar}
                            alt={master.name}
                            className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <span className="text-[10px] font-mono text-[#c5a059] uppercase block">
                              {master.role}
                            </span>
                            <h4 className="font-serif-display text-sm font-bold text-white uppercase">
                              {master.name}
                            </h4>
                            <p className="text-xs text-zinc-400">{master.specialty}</p>
                          </div>
                        </div>
                        {selectedBarber?.id === master.id && (
                          <Check className="w-5 h-5 text-[#c5a059]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* STEP 03: Choose Date */}
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400 mb-2">
                      Select your preferred appointment date (Open 7 Days a week, 9:00 AM – 10:00 PM).
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {dateOptions.map((opt) => (
                        <button
                          key={opt.fullDate}
                          type="button"
                          id={`date-select-${opt.fullDate}`}
                          onClick={() => setSelectedDate(opt.fullDate)}
                          className={`p-3.5 rounded-xl border text-center transition-all ${
                            selectedDate === opt.fullDate
                              ? 'bg-[#c5a059] text-black font-bold border-[#c5a059] shadow-lg'
                              : 'bg-[#141418] text-zinc-300 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-[11px] uppercase font-mono block">
                            {opt.dayName}
                          </span>
                          <span className="font-serif-display text-base font-bold block mt-0.5">
                            {opt.monthDay}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 04: Choose Time Slot */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-400">Available time slots for {selectedDate}:</p>
                      <span className="text-[11px] text-[#c5a059] font-mono">EST (New York)</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          id={`time-slot-${time.replace(/[:\s]/g, '-')}`}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-2 rounded-lg text-xs font-mono transition-all text-center ${
                            selectedTime === time
                              ? 'bg-[#c5a059] text-black font-bold shadow-md'
                              : 'bg-[#141418] text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 05: Confirm & Client Details */}
                {step === 5 && (
                  <form id="booking-details-form" onSubmit={handleFinalSubmit} className="space-y-4">
                    {/* Summary Card */}
                    <div className="p-4 rounded-xl bg-[#141418] border border-[#c5a059]/40 space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="text-xs text-zinc-400 font-mono">SELECTED TREATMENT</span>
                        <span className="font-serif-display text-sm font-bold text-[#c5a059]">
                          ${activeItemPrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-bold">{activeItemName}</span>
                        <span className="text-zinc-400">{activeItemDuration}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-300 pt-1">
                        <span>Master: {selectedBarber ? selectedBarber.name : 'First Available Master'}</span>
                        <span>{selectedDate} at {selectedTime}</span>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="booking-client-name"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Alexander Vance"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#141418] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                            Mobile Phone *
                          </label>
                          <input
                            type="tel"
                            id="booking-client-phone"
                            required
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="+1 (516) 000-0000"
                            className="w-full px-4 py-2.5 rounded-lg bg-[#141418] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            id="booking-client-email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="alexander@example.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-[#141418] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                          Special Requests or Beverage Preference
                        </label>
                        <input
                          type="text"
                          id="booking-client-notes"
                          value={clientNotes}
                          onChange={(e) => setClientNotes(e.target.value)}
                          placeholder="e.g. Espresso on arrival, sensitive skin, beard growth focus..."
                          className="w-full px-4 py-2.5 rounded-lg bg-[#141418] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 bg-[#14141a] border-t border-zinc-800/80 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1 text-xs font-serif-display font-semibold tracking-wider text-zinc-400 hover:text-white px-3 py-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    id="booking-step-next-btn"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-md bg-[#c5a059] text-black font-serif-display font-bold text-xs tracking-widest uppercase hover:bg-[#deb86a] transition-all flex items-center gap-1.5 shadow-lg"
                  >
                    <span>CONTINUE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="booking-details-form"
                    id="confirm-booking-btn"
                    className="px-8 py-3 rounded-md bg-[#c5a059] text-black font-serif-display font-bold text-xs tracking-widest uppercase hover:bg-[#deb86a] transition-all shadow-xl"
                  >
                    CONFIRM RESERVATION
                  </button>
                )}
              </div>
            </>
          )}

          {/* Success Screen */}
          {isSubmitted && (
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif-display text-2xl font-bold text-white uppercase mb-2">
                  YOUR ROYAL SEAT IS RESERVED
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans-luxury max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#c5a059] font-bold">{clientName}</span>. Your reservation request for <span className="text-white font-bold">{activeItemName}</span> on <span className="text-white font-bold">{selectedDate} at {selectedTime}</span> has been logged.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141418] border border-zinc-800 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Location:</span>
                  <span className="text-white">{SALON_INFO.address}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Artisan:</span>
                  <span className="text-white">{selectedBarber ? selectedBarber.name : 'First Available Master'}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Phone Confirmation:</span>
                  <span className="text-[#c5a059] font-mono">{clientPhone}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                * Our front desk concierge will send an SMS confirmation 1 hour prior to your visit. For instant adjustments, call {SALON_INFO.phone}.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="px-5 py-2.5 rounded-md bg-[#181822] border border-zinc-700 hover:border-[#c5a059] text-xs font-mono text-zinc-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>ADD TO CALENDAR (.ICS)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-md bg-[#c5a059] text-black font-serif-display font-bold text-xs tracking-widest uppercase hover:bg-[#deb86a]"
                >
                  DONE
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
