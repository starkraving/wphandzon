import React, { useContext } from 'react';
import {ContentContext} from '../../providers/content.provider';
import ContentBlock from '../contentblock/ContentBlock';
import Modal from '../modal/Modal';
import ModalProvider from '../../providers/modal.provider';
import ModalTrigger from '../modal/ModalTrigger';

const LiveEditor = () => {
    const {content, addContent} = useContext(ContentContext);
    return (
        <>
            <ContentBlock key={'main'} styles={{}} html={''} layout={null}>{content}</ContentBlock>
            <ModalProvider>
                <ModalTrigger><button>Add new Content Block</button></ModalTrigger>
                <Modal title='Add a New Content Block'>This is a modal</Modal>
            </ModalProvider>
        </>
    );
}

export default LiveEditor;