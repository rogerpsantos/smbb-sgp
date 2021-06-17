import React from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab/Alert/Alert';


const useStyles = makeStyles(theme => ({
  root: {
    top: theme.spacing(9)
  }
}));


export default function Notification(props) {

  const classes = useStyles();
  const { notify, setNotify } = props;

  const handleClose = (event, reason) =>{
    setNotify({
      ...notify,
      isOpen: true
    })
  }

  return (
    <Snackbar

      classesName={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
      onClose={handleClose}
    >
      <Alert setNotify={notify.type} onClose={handleClose} >
          {notify.message}
      </Alert>
    </Snackbar>
  )
}