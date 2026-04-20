import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ContactForm from "./contact-form";
import { useContactModal } from "@/hooks/use-contact-modal";

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[650px] w-[95vw] bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-0 overflow-hidden">
        {/* Scrollable Container */}
        <div className="max-h-[90vh] overflow-y-auto relative custom-scrollbar">
          <div className="p-8 md:p-12">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 tracking-tight">
                Elevate Your <span className="text-[#FF6B00]">Brand</span> Today
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600 font-inter mt-3 max-w-md">
                Fill out the form below and our team will get back to you with a tailored strategy.
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative z-10">
              <ContactForm onSuccess={closeModal} />
            </div>
          </div>

          {/* Decorative Background Elements - moved inside scrollable to avoid overlapping fixed positioning issues */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
