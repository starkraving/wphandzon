import React, {useContext} from 'react';
import {ContentContext} from '../../providers/content.provider';
import {ModalContext} from '../../providers/modal.provider';
import { contentTypes } from '../../utils/contentTypes';
import ContentBlock from '../contentblock/ContentBlock';
import Modal from '../modal/Modal';
import ModalTrigger from '../modal/ModalTrigger';
import { ContentModalButton } from './styles';

const LiveEditor = () => {
    const {content, addContent} = useContext(ContentContext);
    const {setIsModalOpen} = useContext(ModalContext);

    const addItemContent = (item) => () => {
        addContent(null, item);
        setIsModalOpen(false)
    };

    return (
        <>
            <ContentBlock key={'main'} styles={{}} html={''} layout={null}>{content}</ContentBlock>
                <ModalTrigger><button style={{marginTop: '10px'}}>Add new Content Block</button></ModalTrigger>
                <Modal title='Add a New Content Block'>
                    {
                        contentTypes.map((item, idx) => {
                            return (<ContentModalButton key={`addbutton${idx}`} onClick={addItemContent(item)}>{item.title}</ContentModalButton>)
                        })
                    }
                </Modal>
        </>
    );
}

export default LiveEditor;