/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const openModal = (type, data) => {
    setModalState({
      isOpen: true,
      type,
      data,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      data: null,
    });
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
