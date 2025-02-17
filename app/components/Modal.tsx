"use cliente"

import { useCallback, useTransition } from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  children: React.ReactNode;
}

export const Modal = ({ modalOpen, setModalOpen, children }: ModalProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClose = useCallback(() => {
    startTransition(() => {
      setModalOpen(false);
    });
  }, [startTransition]);

  return (
    <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <button
        onClick={handleClose}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        disabled={isPending}
        aria-label="Close modal"
        >
        X
        </button>
        {children}
      </div>
    </dialog>
  )
};