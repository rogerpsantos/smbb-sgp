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
  const [agendas, setAgendas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_agenda => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_agenda){
        api.delete(`/agenda/deletar/${id_agenda}`)
          .then((response) => { 
            loadListaAgenda();
        })}
      }
    }

  async function loadListaAgenda() {
    api.get(`/agenda/listar`)
        .then((response) => {
          setAgendas(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaAgenda();
  }, []);
  
  async function onVisibleModal (id_agenda) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/agenda/visualizar/${id_agenda}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/agenda/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">    <b>Título    </b></TableCell>
              <TableCell align="left">    <b>Resumo    </b></TableCell>
              <TableCell align="center">  <b>Início    </b></TableCell>
              <TableCell align="center">  <b>Fim	     </b></TableCell>
              <TableCell align="center">  <b>Cor	     </b></TableCell>
              <TableCell align="center">  <b>Ação      </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {agendas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((age) => {
            return(
              <TableRow  key={age.id_agenda} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{age.titulo}</TableCell>
                  <TableCell align="left">{age.resumo}</TableCell>
                  <TableCell align="center">{age.inicio}</TableCell>
                  <TableCell align="center">{age.fim}</TableCell>
                  <TableCell align="center" bgcolor={age.cor}></TableCell>
                  <TableCell align="center">

                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(age.id_agenda) }} ></Search>
                    
                    <a href={ `/editar/agenda/${age.id_agenda}`}>
                      <Edit aria-label="edit" disabled color="primary" />
                    </a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(age.id_agenda) }} />
                    {/* <DeleteForever aria-label="delete" disabled color="secondary" onClick={handleClickSnackbar({ vertical: 'top', horizontal: 'right' })} /> */}

                    
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
        count={agendas.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_agenda} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_agenda}</label>
          <br/>
          <label align="left"><b>Descrição do Título:</b> {valueModals.titulo}</label>
          <br/>
          <label align="left"><b>Resumo:</b> {valueModals.resumo}</label>
          <br/>
          <label align="left"><b>Data Início:</b> {valueModals.inicio}</label>
          <br/>
          <label align="left"><b>Data Fim:</b> {valueModals.fim}</label>
          <br/>
          <label align="left"><b>Cor de Referência:</b> <b style={{backgroundColor: valueModals.cor }}>{valueModals.cor}</b> </label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
