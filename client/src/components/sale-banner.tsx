import { useContactModal } from "@/hooks/use-contact-modal";

export default function SaleBanner() {
  const { openModal } = useContactModal();

  return (
    <div 
      className="bg-[#007bff] text-white overflow-hidden py-2 px-4 relative group cursor-pointer border-b border-blue-400/30" 
      onClick={openModal}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Left Section: SERVICE SUMMER SALE */}
        <div 
          className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase flex items-baseline gap-2 select-none"
          style={{
            textShadow: "3px 3px 0 #000"
          }}
        >
          <span className="text-[#ceff00]">SERVICE</span>
          <span className="text-[#ceff00]">SUMMER</span>
          <span className="text-white">SALE</span>
        </div>

        {/* Middle Section: ON CUSTOM DEVELOPMENT stacked */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left leading-tight text-white select-none">
          <div className="text-sm md:text-lg font-black italic tracking-tight">
            ON CUSTOM DEVELOPMENT
          </div>
          <div className="text-xs md:text-sm font-bold italic tracking-wide opacity-90">
            ENDS ON 27<sup>th</sup> April, 2026
          </div>
        </div>

        {/* Right Section: Yellow CTA Box */}
        <div className="bg-[#faff00] text-black px-4 py-2 rounded-lg font-black uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
          <span className="text-[10px] md:text-xs leading-none">FLAT</span>
          <span className="text-2xl md:text-4xl leading-none tracking-tighter">50</span>
          <div className="flex flex-col items-start leading-none">
            <span className="text-xs md:text-sm">%</span>
            <span className="text-[8px] md:text-[10px]">OFF</span>
          </div>
        </div>
      </div>
      
      {/* Subtle animated shine effect */}
      <div className="absolute top-0 -inset-x-full h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
    </div>
  );
}
