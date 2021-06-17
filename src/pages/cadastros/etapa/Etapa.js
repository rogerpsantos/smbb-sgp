import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormEtapa from '../../../components/cadastros/etapa/FormEtapa';
import EditEtapa from '../../../components/cadastros/etapa/EditEtapa';


const Etapa = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditEtapa id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormEtapa />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Etapa;