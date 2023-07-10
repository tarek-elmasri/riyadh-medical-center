import { create } from "zustand";

interface UseModalProps {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const useModal = create<UseModalProps>((set) => ({
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
  isOpen: false,
}));

export default useModal;
