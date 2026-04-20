import { useContactModal } from "@/hooks/use-contact-modal";

export default function SaleBanner() {
  const { openModal } = useContactModal();

  return (
    <div 
      className="bg-[#007bff] text-white overflow-hidden py-2 px-4 relative group cursor-pointer border-b border-blue-400/30" 
      onClick={openModal}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Left/Main Section: 3D Text */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 select-none">
          <div 
            className="text-lg sm:text-2xl md:text-3xl font-black italic tracking-tighter uppercase flex items-baseline gap-1"
            style={{
              textShadow: "1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000"
            }}
          >
            <span className="text-white">Summer</span>
            <span className="text-[#facc15]">Start</span>
            <span className="text-white">Sale</span>
          </div>
          
          <div className="hidden lg:flex flex-col leading-none uppercase font-bold italic tracking-tight opacity-90 border-l border-white/20 pl-4">
            <span className="text-[10px]">On Selected Branding & Development Services</span>
            <span className="text-sm">Ends on 30th May 2026</span>
          </div>
        </div>

        {/* Right Section: CTA & Date for Mobile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-end leading-none uppercase font-bold italic mr-1 sm:mr-3">
            <span className="text-[8px] sm:text-[10px] text-white/80">Offer Ends</span>
            <span className="text-[10px] sm:text-sm">30 May 2026</span>
          </div>

          <div className="bg-[#facc15] text-black px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-black text-xs sm:text-base uppercase flex flex-col items-center justify-center leading-none shadow-[0_4px_0_rgb(161,98,7)] active:shadow-none active:translate-y-[2px] transition-all hover:scale-105">
             <span className="text-[8px] sm:text-[10px] opacity-70">Flat</span>
             <span className="text-sm sm:text-xl">50% OFF</span>
          </div>
        </div>
      </div>
      
      {/* Subtle animated shine effect */}
      <div className="absolute top-0 -inset-x-full h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
    </div>
  );
}
