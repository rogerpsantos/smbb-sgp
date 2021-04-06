import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/header/index';
import FormAgenda from './FormAgenda';


const Agenda = () => {

  const { id } = useParams();

    return (
      <div>
        <Menu>
          <div>
            <FormAgenda id={id ? Number.parseInt(id, 10) : null} />
          </div>
        </Menu>
      </div>
    );

}

export default Agenda;