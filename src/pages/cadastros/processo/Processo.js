import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormProcesso from '../../../components/cadastros/processo/FormProcesso';
import EditProcesso from '../../../components/cadastros/processo/EditProcesso';


const Processo = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditProcesso id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormProcesso />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Processo;