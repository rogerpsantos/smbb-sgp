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
  const [prazoObrigacoes, setPrazoObrigacoes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModals, setValueModal] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = id_regra_prazo => {
    if(window.confirm('Deseja realmente apagar o registro?')) {
      if(id_regra_prazo){
        api.delete(`/prazoobrig/deletar/${id_regra_prazo}`)
          .then((response) => { 
            loadListaRegraObrigacao();
        })}
      }
    }

  async function loadListaRegraObrigacao() {
    api.get(`/prazoobrig/listar`)
        .then((response) => {
          setPrazoObrigacoes(response.data.content);
        })
  }
  
  useEffect(() => {
    loadListaRegraObrigacao();
  }, []);
  
  async function onVisibleModal (id_regra_prazo) {
    setValueModal('', '','','','');
    if(isModalVisible === false) { 
        api.get(`/prazoobrig/visualizar/${id_regra_prazo}`)
            .then((response) => { 
              setValueModal(response.data);
        })
    }
    setIsModalVisible(true);
  }

  return (

    <div>
      <div className="btn-cadastrar ">
        <Link href="/cadastrar/prazoobrig/"><Button variant="contained"  color="primary"><Add />Cadastrar</Button></Link>
      </div>
    <br/>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">    <b>Regra Prazo de Obrigação </b></TableCell>
              <TableCell align="center">  <b>Coeficiente              </b></TableCell>
              <TableCell align="center">  <b>Data                     </b></TableCell>
              <TableCell align="center">  <b>Ação                     </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {prazoObrigacoes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inter) => {
            return(
              <TableRow  key={inter.id_regra_prazo} hover role="checkbox" tabIndex={-1} >
                  <TableCell align="left">{inter.desc_regra}</TableCell>
                  <TableCell align="center">{inter.coeficiente}</TableCell>
                  <TableCell align="center">{inter.data_prazo}</TableCell>
                  <TableCell align="center">
                    <Search aria-label="visualizar" color="action" onClick={ () => {onVisibleModal(inter.id_regra_prazo) }} ></Search>
                    <a href={ `/editar/prazoobrig/${inter.id_regra_prazo}`}><Edit aria-label="edit" disabled color="primary" /></a>
                    <DeleteForever aria-label="delete" disabled color="error" onClick={ () => {onDelete(inter.id_regra_prazo) }} />                    
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
        count={prazoObrigacoes.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Linhas por página: "
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />               
    </Paper>
    { (isModalVisible === true) ?
      <Modal onClose={ () => setIsModalVisible(false) } id={valueModals.id_regra_prazo} >
        <br/>
        <div className="info">
          <label align="left"><b>ID:</b> {valueModals.id_regra_prazo}</label>
          <br/>
          <label align="left"><b>Descrição da Regra:</b> {valueModals.desc_regra}</label>
          <br/>
          <label align="left"><b>Coeficiente:</b> {valueModals.coeficiente}</label>
          <br/>
          <label align="left"><b>Data:</b> {valueModals.data_prazo}</label>
        </div>
      </Modal>
    : null }
    </div>
  );
}
