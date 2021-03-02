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
    const {
        hoveredElementCoords,
        activeElementCoords,
        activeElement,
        textEditing,
        editing,
        setEditing,
        setActiveElementCoords,
        setActiveElement
    } = useContext(EditorContext);

    const addItemContent = (item) => () => {
        let parentId = null;
        let row = null;
        let column = 1;
        if (activeElement) {
            parentId = activeElement.parentId;
            row = activeElement.layout.row;
            column = activeElement.layout.column;
        }
        addContent(parentId, row, column, item);
        setOpenModal(null)
    };

    const duplicateItemContent = () => {
        if (!activeElement) {
            return;
        }
        const {parentId, styles, html, layout, children} = activeElement;
        addContent(
            parentId,
            layout.row,
            layout.column,
            {
                styles,
                html,
                layout,
                children
            }
        )
        setOpenModal(null);
    }

    const handleInactiveClick = useCallback(() => {
        if (textEditing) {
            return;
        }
        setEditing(false);
        setActiveElementCoords(null);
        setActiveElement(null);
    }, [textEditing, setEditing, setActiveElementCoords, setActiveElement]);

    useEffect(() => {
        document.addEventListener('click', handleInactiveClick);
        return () => {
            document.removeEventListener('click', handleInactiveClick);
        };
    }, [handleInactiveClick]);

    return (
        <div style={{padding: '16px 1px 1px'}}>
            <ContentBlock key={'main'} parentId={null} {...content}></ContentBlock>
            <ModalTrigger target='add_content'><button style={{marginTop: '10px'}}>Add new Content Block</button></ModalTrigger>
            <Modal name='add_content' title='Add a New Content Block'>
                {
                    contentTypes.map((item, idx) => {
                        return (<ContentModalButton key={`addbutton${idx}`} onClick={addItemContent(item)}>{item.title}</ContentModalButton>)
                    })
                }
                {
                    activeElement && <ContentModalButton key='dupebutton' onClick={duplicateItemContent}>Copy Selected Item</ContentModalButton>
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