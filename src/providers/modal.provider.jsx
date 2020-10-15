import React from 'react';
import { useState } from 'react';

const defaults = {
    open: false,
    customSubmit: false,
    customCancel: false,
};

export const ModalContext = React.createContext({
    open: defaults.open,
    customSubmit: defaults.customSubmit,
    customCancel: defaults.customCancel,
    setIsModalOpen: () => {},
    onSubmit: () => {},
    onCancel: () => {},
});

const ModalProvider = ({onSubmit: submitHandler, onCancel: cancelHandler, children}) => {
    const [open, setIsModalOpen] = useState(defaults.open);
    const [customSubmit, setCustomSubmit] = useState(defaults.customSubmit);
    const [customCancel, setCustomCancel] = useState(defaults.customCancel);

    if (submitHandler) {
        setCustomSubmit(true);
    }

    if (cancelHandler) {
        setCustomCancel(true);
    }

    const onSubmit = () => {
        setIsModalOpen(false);
        if (submitHandler) {
            submitHandler();
        }
    }

    const onCancel = () => {
        setIsModalOpen(false);
        if (cancelHandler) {
            cancelHandler();
        }
    }

    return <ModalContext.Provider value={{
        open,
        customSubmit,
        customCancel,
        setIsModalOpen,
        onSubmit,
        onCancel,
    }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;