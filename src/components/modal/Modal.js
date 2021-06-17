import React from 'react';
import './Modal.css';


const Modal = ({ id = {}, onClose = () => {}, children}) => {

  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }

  return (
        <div id="modal" className="modal" onClick={handleOutsideClick}>
          <div className="conteiner">
            <header className="header">
              <button className="close" onClick={onClose} />
            </header>
            <div className="content">
              {children}
            </div>
          </div>
        </div>
  );
};

export default Modal;