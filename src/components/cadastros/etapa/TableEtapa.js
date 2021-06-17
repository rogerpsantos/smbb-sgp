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
  const [etapas, setEtapas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_etapa => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_etapa){
        api.delete(`/etapa/deletar/${id_etapa}`)
          .then((response) => { 
            loadListaEtapa();
        })}
      }
    }

  async function loadListaEtapa() {
    api.get(`/etapa/listar`)
        .then((response) => {
          setEtapas(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaEtapa();
  }, []);
  
  async function onVisibleModal (id_etapa) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/etapa/visualizar/${id_etapa}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/etapa/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">    <b>Código              </b></TableCell>
              <TableCell align="left">    <b>Descrição da Etapa  </b></TableCell>
              <TableCell align="left">    <b>Observação          </b></TableCell>
              <TableCell align="center">  <b>Ação                </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {etapas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((etap) => {
            return(
              <TableRow  key={etap.id_etapa} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{etap.cod_etapa}</TableCell>
                  <TableCell align="left">{etap.nome_etapa}</TableCell>
                  <TableCell align="left">{etap.observacao}</TableCell>
                  <TableCell align="center">
                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(etap.id_etapa) }} ></Search>
                    <a href={ `/editar/etapa/${etap.id_etapa}`}><Edit aria-label="edit" disabled color="primary" /></a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(etap.id_etapa) }} />                    
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
        count={etapas.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_etapa} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_etapa}</label>
          <br/>
          <label align="left"><b>Código:</b> {valueModals.cod_etapa}</label>
          <br/>
          <label align="left"><b>Nome do Projeto:</b> {valueModals.nome_etapa}</label>
          <br/>
          <label align="left"><b>Observação:</b> {valueModals.observacao}</label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
