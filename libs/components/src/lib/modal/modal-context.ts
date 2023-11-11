import { createContext, useContext } from 'react';

export interface ModalProperties {
  closeModal: (data?: unknown) => void;
  afterClose: () => void;
  beforeOpen: () => void;
  isOpen: boolean;
}

const initialObject = new Proxy({} as ModalProperties, {
  get() {
    throw new Error('Not implemened');
  },
});

export const ModalContext = createContext<ModalProperties>(initialObject);

export const useModalContext = () => {
  const { closeModal } = useContext(ModalContext);

  return {
    closeModal,
  };
};
