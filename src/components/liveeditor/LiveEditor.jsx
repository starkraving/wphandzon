import React, {useCallback, useContext} from 'react';
import { useEffect } from 'react';
import {ContentContext} from '../../providers/content.provider';
import { EditorContext } from '../../providers/editor.provider';
import {ModalContext} from '../../providers/modal.provider';
import { contentTypes } from '../../utils/contentTypes';
import ContentBlock from '../contentblock/ContentBlock';
import ContentHighlighter from '../ContentHighlighter';
import ActiveContentHighlighter from '../ContentHighlighter/ActiveContentHighlighter';
import Modal from '../modal/Modal';
import ModalTrigger from '../modal/ModalTrigger';
import { ContentModalButton } from './styles';

const LiveEditor = () => {
    const {content, addContent} = useContext(ContentContext);
    const {setOpenModal} = useContext(ModalContext);
    const {hoveredElementCoords, activeElementCoords, editing, setEditing, setActiveElementCoords, setActiveElementId} = useContext(EditorContext);

    const addItemContent = (item) => () => {
        addContent(null, null, item);
        setOpenModal(null)
    };

    const handleInactiveClick = useCallback(() => {
        setEditing(false);
        setActiveElementCoords(null);
        setActiveElementId(null);
    }, [setEditing, setActiveElementCoords, setActiveElementId]);

    useEffect(() => {
        document.addEventListener('click', handleInactiveClick);
        return () => {
            document.removeEventListener('click', handleInactiveClick);
        };
    }, [handleInactiveClick]);

    return (
        <div style={{padding: '16px 1px 1px'}}>
            <ContentBlock key={'main'} styles={content.styles} html={content.html} layout={content.layout}>{content.children}</ContentBlock>
            <ModalTrigger target='add_content'><button style={{marginTop: '10px'}}>Add new Content Block</button></ModalTrigger>
            <Modal name='add_content' title='Add a New Content Block'>
                {
                    contentTypes.map((item, idx) => {
                        return (<ContentModalButton key={`addbutton${idx}`} onClick={addItemContent(item)}>{item.title}</ContentModalButton>)
                    })
                }
            </Modal>
            {
                (hoveredElementCoords)
                    ? <ContentHighlighter coords={hoveredElementCoords} />
                    : ''
            }
            {
                (editing)
                    ? <ActiveContentHighlighter coords={activeElementCoords} />
                    : ''
            }
        </div>
    );
}

export default LiveEditor;