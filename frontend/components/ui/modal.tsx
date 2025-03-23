import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 md:p-8">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] max-w-7xl">
        <div className="bg-background rounded-lg shadow-lg h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
