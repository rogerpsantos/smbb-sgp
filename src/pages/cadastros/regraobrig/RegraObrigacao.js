import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormRegraObrigacao from '../../../components/cadastros/regraobrig/FormRegraObrigacao';
import EditRegraObrigacao from '../../../components/cadastros/regraobrig/EditRegraObrigacao';


const RegraObrigacao = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditRegraObrigacao id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormRegraObrigacao />
          </div>
        </Menu>
      </div>
    );
  }
}

export default RegraObrigacao;