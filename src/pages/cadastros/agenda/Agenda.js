import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormAgenda from '../../../components/cadastros/agenda/FormAgenda';
import EditAgenda from '../../../components/cadastros/agenda/EditAgenda';


const Agenda = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditAgenda id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormAgenda />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Agenda;