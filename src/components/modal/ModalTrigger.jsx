import React, { useContext, Fragment } from 'react';
import { ModalContext } from '../../providers/modal.provider';

const ModalTrigger = ({children}) => {
    const {open, setIsModalOpen} = useContext(ModalContext);
    const toggleOpen = () => {
        setIsModalOpen(!open);
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