import React from 'react';
import './Button.css'

const Button = (props) => {

  return (
    <div>
      <button type="submit" className="btn-form btn-form-cadastrar">
        {props.children}
      </button>
    </div>
  )
}

export default Button;