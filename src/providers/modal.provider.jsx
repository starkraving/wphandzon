import React from 'react';
import { useState } from 'react';

const defaults = {
    openModal: false,
};

export const ModalContext = React.createContext({
    openModal: defaults.openModal,
    setOpenModal: () => {},
});

const ModalProvider = ({children}) => {
    const [openModal, setOpenModal] = useState(defaults.openModal);

    return <ModalContext.Provider value={{
        openModal,
        setOpenModal,
    }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;