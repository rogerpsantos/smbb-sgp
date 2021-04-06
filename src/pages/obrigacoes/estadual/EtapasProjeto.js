import React, { Component } from 'react';
import Menu from '../../../components/header/index';
import Etapas from '../../projects/etapas';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

export default class etapasProjeto extends Component {

  render() {
    return (
      <div>
        <Menu>
          <div>
            <Etapas/>
          </div>
        </Menu>
      </div>
    );
  }

}