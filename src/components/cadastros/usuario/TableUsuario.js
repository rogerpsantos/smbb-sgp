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
import Modal from '../../modal/Modal';
import api from '../../../services/api';
import Button from '@material-ui/core/Button/Button';
import Add from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link/Link';
import '../../table/Table.css';


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
  const [usuarios, setUsuarios] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_usuario => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_usuario){
        api.delete(`/usuario/deletar/${id_usuario}`)
          .then((response) => { 
            loadListaProcesso();
        })}
      }
    }

  async function loadListaProcesso() {
    api.get(`/usuario/listar`)
        .then((response) => {
          setUsuarios(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaProcesso();
  }, []);
  
  async function onVisibleModal (id_usuario) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/usuario/visualizar/${id_usuario}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/usuario/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">  <b>Nome  </b></TableCell>
              <TableCell align="left">  <b>E-mail</b></TableCell>
              <TableCell align="left">  <b>Login </b></TableCell>
              <TableCell align="left">  <b>Status</b></TableCell>
              <TableCell align="center"><b>Ação  </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
            return(
              <TableRow  key={user.id_usuario} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{user.nome + " " + user.sobrenome}         </TableCell>
                  <TableCell align="left">{user.email}                               </TableCell>
                  <TableCell align="left">{user.login}                               </TableCell>
                  <TableCell align="left">{user.status === 'A' ? 'Ativo' : 'Inativo'}</TableCell>
                  <TableCell align="center">
                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(user.id_usuario) }} ></Search>
                    <a href={ `/editar/usuario/${user.id_usuario}`}><Edit aria-label="edit" disabled color="primary" /></a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(user.id_usuario) }} />                    
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
        count={usuarios.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_usuario} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_usuario}</label>
          <br/>
          <label align="left"><b>Nome:</b> {valueModals.nome+ " " + valueModals.sobrenome}</label>
          <br/>
          <label align="left"><b>E-mail:</b> {valueModals.email}</label>
          <br/>
          <label align="left"><b>Login:</b> { valueModals.login}</label>
          <br/>
          <label align="left"><b>Status:</b> {valueModals.status === 'A' ? 'Ativo' : 'Inativo' }</label>
          <br/>
          <label align="left"><b>Nível:</b> {valueModals.nivel}</label>
          <br/>
          <label align="left"><b>Perfil:</b> {valueModals.perfil}</label>
          <br/>
          <label align="left"><b>Grupo:</b> {valueModals.grp_usuario}</label>
          <br/>
          <label align="left"><b>Data Cadastro:</b> {valueModals.data_cadastro}</label>
          <br/>
          <label align="left"><b>Usuário Alteração:</b> {valueModals.usuario_alteracao}</label>
          <br/>
          <label align="left"><b>Data Alteração:</b> {valueModals.data_alteracao}</label>
          <br/>
          <label align="left"><b>Deletado:</b> {valueModals.deletado}</label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
