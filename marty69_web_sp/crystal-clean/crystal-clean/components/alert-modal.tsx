"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Opravdu to chcete udělat?"
      description="Tato akce je nevratná."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          className="bg-zinc-500 text-white hover:bg-zinc-800"
          onClick={onClose}
        >
          Zrušit
        </Button>
        <Button
          disabled={loading}
          className=" hover:bg-red-800 hover:text-white"
          onClick={onConfirm}
        >
          Pokračovat
        </Button>
      </div>
    </Modal>
  );
};
