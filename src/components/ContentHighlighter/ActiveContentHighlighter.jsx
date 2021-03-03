import React, { useContext } from 'react';
import useStylesFromCoords from '../../hooks/useStylesFromCoords';
import { Border, Button, Icon, MenuBar, Separator } from './styles';
import {faArrowsAlt, faICursor, faPlus, faTrashAlt, faSave} from '@fortawesome/free-solid-svg-icons'
import ModalTrigger from '../modal/ModalTrigger';
import { ContentContext } from '../../providers/content.provider';
import { EditorContext } from '../../providers/editor.provider';
import Modal from '../modal/Modal';
import { ModalButtons } from '../modal/styles';

const ActiveContentHighlighter = ({coords}) => {
    const {topBorderStyles, rightBorderStyles, bottomBorderStyles, leftBorderStyles} = useStylesFromCoords(coords);
    const {editContent, removeContent} = useContext(ContentContext);
    const {activeElement, textEditing, setTextEditing, setEditing} = useContext(EditorContext);

    const keepActiveFocus = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    };

    const deleteElement = () => {
        removeContent(activeElement);
        setEditing(false);
    };

    const startEditing = () => {
        setTextEditing(true);
    };

    const stopEditing = () => {
        editContent(activeElement, textEditing);
        setTextEditing(false);
    };

    return (
        <>
            <Border style={topBorderStyles} onClick={keepActiveFocus}>
                {
                    !textEditing && activeElement.id && <MenuBar>
                        <Button $cursor='move' title='Drag the element to another position within its container'>
                            <Icon icon={faArrowsAlt} />
                        </Button>
                        {
                            !activeElement.hasChildren && <Button $cursor='text' title='Start textEditing the content of the element' onClick={startEditing}>
                                <Icon icon={faICursor} />
                            </Button>
                        }
                        <Button title='Add a new sibling element'>
                            <ModalTrigger target='add_content'><Icon icon={faPlus} /></ModalTrigger>
                        </Button>
                        <Separator />
                        <Button title='Delete this element'>
                            <ModalTrigger target='confirm_delete'>
                                <Icon icon={faTrashAlt} />
                            </ModalTrigger>
                        </Button>
                    </MenuBar>
                }
                {
                    textEditing && <MenuBar>
                        <Button title='Finish Editing' onClick={stopEditing}>
                            <Icon icon={faSave} />
                        </Button>
                    </MenuBar>
                }

                <Modal name='confirm_delete' title='Delete Element' onSubmit={deleteElement}>
                    <p>Are you sure you want to permanently delete this element and all its children?</p>
                    <ModalButtons>
                        <button type='submit'>Delete Element</button>
                    </ModalButtons>
                </Modal>
            </Border>
            <Border style={rightBorderStyles} />
            <Border style={bottomBorderStyles} />
            <Border style={leftBorderStyles} />
        </>
    );
}

export default ActiveContentHighlighter;