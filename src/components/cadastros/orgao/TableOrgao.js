import React, { useState, useEffect } from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Search from '@material-ui/icons/Search';
import Modal from '../../../components/modal/Modal';
// import Notification from '../../../components/Notification/Notification';
import api from '../../../services/api';
import './TableOrgao.css';

// export default function ListaOrgaos() {
//   const [orgaos, setOrgaos] = useState([]);
//   const [notify, setNotify] = useState({isOpen: false, message: '', type: ''}); 
//   return (
//     <div className="div-tabela-orgao">
//       <Notification 
//       notify={notify}
//       setNotify={setNotify}
//     />
//     </div>
//   );
// }

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
});


export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orgaos, setOrgaos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_orgao => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_orgao){
        api.delete(`/orgao/deletar/${id_orgao}`)
          .then((response) => { 
              loadListaOrgaos();
              // setOrgaos(response.data.content);
              // setNotify({isOpen: true, message: 'Deletado cmo Sucesso', type: 'error'})
              // { response === 200 
                // ? setNotify({isOpen: true, message: 'Deletado cmo Sucesso', type: 'error'})
                // : setNotify({isOpen: true, message: 'Erro ao apagar registro', type: 'warning'})
              // }
        })}
          // setNotify({isOpen: true, message: 'Deletado cmo Sucesso', type: 'error'});
      }
    }

  // const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});

  async function loadListaOrgaos() {
    api.get(`/orgao/listar`)
        .then((response) => {
          setOrgaos(response.data.content);
        })
  }
  useEffect(() => {
    loadListaOrgaos();
  }, []);
  
  


  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell  align="left"><b>Descrição        </b></TableCell>
              <TableCell align="center"><b>UF               </b></TableCell>
              <TableCell align="left"><b>Municipio        </b></TableCell>
              <TableCell align="left"><b>Divisão do Órgão	</b></TableCell>
              <TableCell align="center"><b>Ação             </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orgaos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((org) => {
            return(
              <TableRow  key={org.id_orgao} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{org.desc_orgao}</TableCell>
                  <TableCell align="center">{org.uf}</TableCell>
                  <TableCell align="left">{org.municipios.desc_mun}</TableCell>
                  <TableCell align="left">{org.divorgaos.descricao}</TableCell>
                  <TableCell align="center">

                    <Search aria-label="visualizar" color="action" onClick={() => setIsModalVisible(true)} value={org.id_orgao} ></Search>
                    { isModalVisible ? (
                      <Modal onClose={ () => setIsModalVisible(false) } id={org.id_orgao} >
                        {org.id_orgao}
                        <h1>Desc: {org.desc_orgao}</h1>
                      </Modal>
                      ) 
                    : null }
                    <a href={ `/editar/orgao/${org.id_orgao}`}>
                      <Edit aria-label="edit" disabled color="primary" />
                    </a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(org.id_orgao) }} />
                  </TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orgaos.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
  );
}
