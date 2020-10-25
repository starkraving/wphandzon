import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ModalWrapper } from './styles';
import { ModalContext } from '../../providers/modal.provider';

const Modal = ({name, onSubmit: submitHandler, onCancel: cancelHandler, title, children}) => {
    const {openModal, setOpenModal} = useContext(ModalContext);
    const open = (openModal === name);

    const onSubmit = (e) => {
        e.preventDefault();
        setOpenModal(null);
        if (submitHandler) {
            submitHandler();
        }
    }

    const onCancel = () => {
        setOpenModal(null);
        if (cancelHandler) {
            cancelHandler();
        }
    }

    const closeModal = (e) => {
       e.stopPropagation();
       e.nativeEvent.stopImmediatePropagation();
        
        onCancel();
    };

    return (
        <ModalWrapper isOpen={open}>
            <ModalOverlay onClick={closeModal}></ModalOverlay>
            <ModalContainer>
                <ModalTitle>
                    {title}
                    <button type='button' onClick={closeModal}>X</button>
                </ModalTitle>
                <ModalContent>
                    <form onSubmit={onSubmit}>
                        {children}
                    </form>
                </ModalContent>
            </ModalContainer>
        </ModalWrapper>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Modal;