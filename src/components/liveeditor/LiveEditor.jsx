import React, {useContext} from 'react';
import {ContentContext} from '../../providers/content.provider';
import { EditorContext } from '../../providers/editor.provider';
import {ModalContext} from '../../providers/modal.provider';
import { contentTypes } from '../../utils/contentTypes';
import ContentBlock from '../contentblock/ContentBlock';
import ContentHighlighter from '../ContentHighlighter';
import Modal from '../modal/Modal';
import ModalTrigger from '../modal/ModalTrigger';
import { ContentModalButton } from './styles';

const LiveEditor = () => {
    const {content, addContent} = useContext(ContentContext);
    const {setIsModalOpen} = useContext(ModalContext);
    const {activeElementCoords} = useContext(EditorContext);

    const addItemContent = (item) => () => {
        addContent(null, item);
        setIsModalOpen(false)
    };

    return (
        <div style={{padding: '16px 1px 1px'}}>
            <ContentBlock key={'main'} styles={{padding: '10px'}} html={''} layout={null}>{content}</ContentBlock>
            <ModalTrigger><button style={{marginTop: '10px'}}>Add new Content Block</button></ModalTrigger>
            <Modal title='Add a New Content Block'>
                {
                    contentTypes.map((item, idx) => {
                        return (<ContentModalButton key={`addbutton${idx}`} onClick={addItemContent(item)}>{item.title}</ContentModalButton>)
                    })
                }
            </Modal>
            {
                (activeElementCoords)
                    ? <ContentHighlighter coords={activeElementCoords}></ContentHighlighter>
                    : ''
            }
        </div>
    );
}

export default LiveEditor;