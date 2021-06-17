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
  const [intervalos, setIntervalos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_intervalo => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_intervalo){
        api.delete(`/intervalo/deletar/${id_intervalo}`)
          .then((response) => { 
            loadListaIntervalo();
        })}
      }
    }

  async function loadListaIntervalo() {
    api.get(`/intervalo/listar`)
        .then((response) => {
          setIntervalos(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaIntervalo();
  }, []);
  
  async function onVisibleModal (id_intervalo) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/intervalo/visualizar/${id_intervalo}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/intervalo/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">    <b>Descrição do Intervalo    </b></TableCell>
              <TableCell align="center">  <b>Objeto                    </b></TableCell>
              <TableCell align="center">  <b>Ação                      </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {intervalos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inter) => {
            return(
              <TableRow  key={inter.id_intervalo} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{inter.desc_intervalo}</TableCell>
                  <TableCell align="center">{inter.objeto}</TableCell>
                  <TableCell align="center">
                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(inter.id_intervalo) }} ></Search>
                    <a href={ `/editar/intervalo/${inter.id_intervalo}`}><Edit aria-label="edit" disabled color="primary" /></a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(inter.id_intervalo) }} />                    
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
        count={intervalos.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_intervalo} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_intervalo}</label>
          <br/>
          <label align="left"><b>Descrição do Intervalo:</b> {valueModals.desc_intervalo}</label>
          <br/>
          <label align="left"><b>Objeto:</b> {valueModals.objeto}</label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
