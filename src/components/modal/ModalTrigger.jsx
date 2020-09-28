import React, { useContext, Fragment } from 'react';
import { ModalContext } from '../../providers/modal.provider';

const ModalTrigger = ({children}) => {
    const {open, setIsOpen} = useContext(ModalContext);
    const toggleOpen = () => {
        setIsOpen(!open);
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