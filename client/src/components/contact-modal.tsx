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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppins font-semibold text-[#333333]">
            Elevate Your Brand Today
          </DialogTitle>
          <DialogDescription className="text-gray-600 font-inter">
            Fill out the form below and our team will get back to you with a tailored strategy.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ContactForm onSuccess={closeModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
