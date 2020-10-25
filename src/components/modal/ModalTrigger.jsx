import React, { useContext, Fragment } from 'react';
import { ModalContext } from '../../providers/modal.provider';

const ModalTrigger = ({target, children}) => {
    const {setOpenModal} = useContext(ModalContext);
    const toggleOpen = () => {
        setOpenModal(target);
    }

    return <Fragment>
    {React.Children.map(children, child => (
      React.cloneElement(child, {
       onClick: toggleOpen,
      })
    ))
    }
  </Fragment>;
};

export default ModalTrigger;