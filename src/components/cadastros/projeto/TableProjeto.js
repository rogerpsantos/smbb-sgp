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
  const [projetos, setProjetos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_projeto => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_projeto){
        api.delete(`/projeto/deletar/${id_projeto}`)
          .then((response) => { 
            loadListaProjeto();
        })}
      }
    }

  async function loadListaProjeto() {
    api.get(`/projeto/listar`)
        .then((response) => {
          setProjetos(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaProjeto();
  }, []);
  
  async function onVisibleModal (id_projeto) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/projeto/visualizar/${id_projeto}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/projeto/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">    <b>Código           </b></TableCell>
              <TableCell align="left">    <b>Nome do Projeto  </b></TableCell>
              <TableCell align="left">    <b>Observação       </b></TableCell>
              <TableCell align="center">  <b>Ação             </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {projetos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((proj) => {
            return(
              <TableRow  key={proj.id_projeto} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{proj.cod_projeto}</TableCell>
                  <TableCell align="left">{proj.nome_projeto}</TableCell>
                  <TableCell align="left">{proj.observacao}</TableCell>
                  <TableCell align="center">
                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(proj.id_projeto) }} ></Search>
                    <a href={ `/editar/projeto/${proj.id_projeto}`}><Edit aria-label="edit" disabled color="primary" /></a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(proj.id_projeto) }} />                    
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
        count={projetos.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_projeto} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_projeto}</label>
          <br/>
          <label align="left"><b>Código:</b> {valueModals.cod_projeto}</label>
          <br/>
          <label align="left"><b>Nome do Projeto:</b> {valueModals.nome_projeto}</label>
          <br/>
          <label align="left"><b>Observação:</b> {valueModals.observacao}</label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
