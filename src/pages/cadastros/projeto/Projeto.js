import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormProjeto from '../../../components/cadastros/projeto/FormProjeto';
import EditProjeto from '../../../components/cadastros/projeto/EditProjeto';


const Projeto = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditProjeto id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormProjeto />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Projeto;