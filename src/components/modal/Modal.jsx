import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContainer, ModalTitle, ModalContent, ModalButtons, ModalWrapper } from './styles';
import { useEffect } from 'react';
import { ModalContext } from '../../providers/modal.provider';

const Modal = ({title, children, submitText}) => {
    const {open, customSubmit, customCancel, setIsModalOpen, onSubmit, onCancel} = useContext(ModalContext);

    useEffect(() => {
        setIsModalOpen(open);
    }, [setIsModalOpen, open]);

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
                    <button onClick={closeModal}>X</button>
                </ModalTitle>
                <ModalContent>
                    {children}
                </ModalContent>
                {
                    (customSubmit || customCancel)
                        ? (
                            <ModalButtons>
                                {customSubmit ? <button type='submit' onClick={onSubmit}>{submitText}</button> : ''}
                                <button type='button' onClick={closeModal}>Cancel</button>
                            </ModalButtons>
                          )
                        : ''
                }
            </ModalContainer>
        </ModalWrapper>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
};

export default Modal;