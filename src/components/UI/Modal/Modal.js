import React from 'react';
import ReactDOM from 'react-dom';

const Etapas = document.getElementById('tarefa-list');

const UIModal = ({children, isOpen, onClickClose}) => {

  if(!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button type="button" className="ui-modal__close-button" onClick={onClickClose}>X</button>
        { children }
      </div>
    </div>,
    Etapas,
  );
};

export default UIModal;