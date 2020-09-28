import React from 'react';
import { useState } from 'react';

const defaults = {
    open: false,
};

export const ModalContext = React.createContext({
    open: defaults.open,
    setIsOpen: () => {},
    onSubmit: () => {},
    onCancel: () => {},
});

const ModalProvider = ({onSubmit: submitHandler, onCancel: cancelHandler, children}) => {
    const [open, setIsOpen] = useState(defaults.open);

    const onSubmit = () => {
        setIsOpen(false);
        if (submitHandler) {
            submitHandler();
        }
    }

    const onCancel = () => {
        setIsOpen(false);
        if (cancelHandler) {
            cancelHandler();
        }
    }

    return <ModalContext.Provider value={{
        open,
        setIsOpen,
        onSubmit,
        onCancel,
    }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;