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
  const [feriados, setFeriados] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_feriado => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_feriado){
        api.delete(`/feriado/deletar/${id_feriado}`)
          .then((response) => { 
            loadListaFeriado();
        })}
      }
    }

  async function loadListaFeriado() {
    api.get(`/feriado/listar`)
        .then((response) => {
          setFeriados(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaFeriado();
  }, []);
  
  async function onVisibleModal (id_feriado) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/feriado/visualizar/${id_feriado}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/feriado/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">    <b>Descrição do Feríado    </b></TableCell>
              <TableCell align="center">    <b>Data    </b></TableCell>
              <TableCell align="center">  <b>Ação      </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {feriados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((fer) => {
            return(
              <TableRow  key={fer.id_feriado} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{fer.desc_feriado}</TableCell>
                  <TableCell align="center">{fer.data}</TableCell>
                  <TableCell align="center">
                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(fer.id_feriado) }} ></Search>
                    <a href={ `/editar/feriado/${fer.id_feriado}`}><Edit aria-label="edit" disabled color="primary" /></a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(fer.id_feriado) }} />                    
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
        count={feriados.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_feriado} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_feriado}</label>
          <br/>
          <label align="left"><b>Descrição do Feríado:</b> {valueModals.desc_feriado}</label>
          <br/>
          <label align="left"><b>Data:</b> {valueModals.data}</label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
