import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormIntervalo from '../../../components/cadastros/intervalo/FormIntervalo';
import EditIntervalo from '../../../components/cadastros/intervalo/EditIntervalo';


const Intervalo = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditIntervalo id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormIntervalo />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Intervalo;