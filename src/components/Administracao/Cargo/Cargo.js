import React, { Fragment, useEffect } from 'react';
import { AuthContext } from "../../../App";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { cargoFindAll, cargoInsert, cargoUpdate, cargoDelete } from '../../../services/CargoService';
/*import { convertGridRowsPropToState, DataGrid } from '@material-ui/data-grid';*/
import { Pagina } from '../../Template/Template';
import { useHistory } from "react-router-dom";
//import MenuPrincipal from "../../MenuPrincipal/MenuPrincipal";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { Promisse } from 'bluebird';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { green, amber, red } from '@material-ui/core/colors';


import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import { Typography } from '@material-ui/core';
//import Link from '@material-ui/core/Link';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';



var inserir = true;

//const useStyles = makeStyles((theme) => ({
//  root: {
//    display: 'flex',
//    '& > *': {
//      margin: theme.spacing(1),
//    },
//  },
//}));

const useStyles = makeStyles((theme) => ({
    box: {
        'display': 'flex',    
        'flex-direction': 'row',
        'justify-content': 'center',
        'alignItems': 'center',
        'backgroundColor': 'white',
/*        'border': '5px solid green',*/
        'height': '100%',
        'width': '50%',
        'backgroundColor' : 'transparent',
    },
    boxPrancheta: {
        'height': '600px',
        'width': '900px',
        'backgroundColor' : 'white',
/*        'border': '5px solid blue',*/
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxDataGrid: {
        '& .header_grid': {
            backgroundColor: 'black',
            color: 'white',
          },
          'display': 'flex',
          'width': '800px',
        'height': '500px',
        'flexFlow': '1',
        'align-content': 'center',
        'alignItems': 'center',
/*        'border': '5px solid blue',*/
        'backgroundColor': 'white',
    },
    side_content: {
/*        'background-color': '#cce0ff',*/
/*        'border': 'solid 1px #0052cc',*/
        'display': 'grid',
        'overflow': 'auto',
    },
    nome: {
        width: '400px',
    },
    header_grid: {
        'backgroundColor': 'black',
        'color': 'white',
    },
    input_data: {
        'display': 'flex',
        'flexDirection': 'row',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      }
}));

export default function Cargo() {
    const classes = useStyles();
    const [errorData, setErrorData] = React.useState("");

    const [list, setList] = React.useState([]);
    const [selection, setSelection] = React.useState({});
    
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const msg="Esta e a mensagem de rodape";
    let history = useHistory();

    const { state: authState } = React.useContext(AuthContext);

    const navegar = () => {
//        history.push("/");
        setOpenDialog(true);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };

    function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
    }      


    const formik = useFormik({
        initialValues: { cargo: ''},
        validate: (values) => {
        const errors = {};
        if (!values.cargo) {
            errors.cargo = 'Nome do Cargo é obrigatório';
        } else if (values.cargo.length > 60) {
            errors.cargo = 'Descrição do cargo maior que 60 caracteres';
        } else if (values.cargo.length < 3) {
            errors.cargo = 'Descrição do cargo menor que 5 caracteres';
        }
        return errors;
        },
        onSubmit : (values, { setSubmitting }) => {
            setSubmitting(true);
            if (inserir) {
                const cargo = {'car_nome': formik.values.cargo};
                cargoInsert(authState, cargo)
                  .then(result=>{
                    cargoFindAll(authState, setErrorData)
                    .then(user=>{            
                        setList(user.data);          
                        }
                    );
                  });
        
            } else {
                const cargo = {"key": {"car_id": selection.car_id}, "car_nome": formik.values.cargo};
                cargoUpdate(authState, cargo)
                  .then(result=>{
                    cargoFindAll(authState, setErrorData)
                    .then(user=>{            
                        setList(user.data);          
            
                        }
                    );
                  })
            }
            setOpenDialog(false);
        },
    });  

    useEffect(() => {
        let mounted = true;
        cargoFindAll(authState, setErrorData)
        .then(user=>{
            setList(user.data);
            }
        );
        return () => mounted = false;
        }, []
    );

    const newRecord = () => {
        inserir = true;        
        formik.setFieldValue('cargo', '');
        setOpenDialog(true);
    };

    const closeDialog = () => {
        inserir = false;        
        setOpenDialog(false);
    };

    const Breadcrumb = () => {
        return(
            <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Material-UI
            </Link>
            <Link
                color="inherit"
                href="/getting-started/installation/"
                className={classes.link}
            >
                <WhatshotIcon className={classes.icon} />
                Core
            </Link>
            <Typography color="textPrimary" className={classes.link}>
                <GrainIcon className={classes.icon} />
                Breadcrumb
            </Typography>
            </Breadcrumbs>                    
        );
    }


    const deleteRecord = () => {
        inserir = true;    
        const cargo = {"key": {"car_id": selection.car_id}};
        cargoDelete(authState, cargo)
        .then(result=>{
          cargoFindAll(authState, setErrorData)
          .then(user=>{            
              setList(user.data);
              setOpenDialog(false);
            }
          );

        })
        .catch(error=>{
            console.log(error);
        })

    };

    //const theme2 = createMuiTheme({
    //    palette: {
    //      primary: green,
    //    },
    //  });
      
    const ColorButtonSave = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(green[500]),
          fontSize: 12,
          padding: '2px 2px',
          margin: '10px',
          border: '1px solid',
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
        },
      }))(Button);    

      const ColorButtonCancel = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(amber[500]),
          fontSize: 12,
          padding: '2px 2px',
          margin: '10px',
          border: '1px solid',
          backgroundColor: amber[500],
          '&:hover': {
            backgroundColor: amber[700],
          },
        },
      }))(Button);    

      const ColorButtonDelete = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(red[500]),
          fontSize: 12,
          padding: '2px 2px',
          margin: '10px',
          border: '1px solid',
          backgroundColor: red[500],
          '&:hover': {
            backgroundColor: red[700],
          },
        },
      }))(Button);    


    const Dialogo = () => {
        return(
            <Dialog open={openDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                Manutenção de Cargo
                <ColorButtonCancel variant="contained" color="primary" type="button" onClick={closeDialog} >Cancelar</ColorButtonCancel>

                <Divider />
            </DialogTitle>            
            <DialogContent>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                <div className={classes.input_data}>
                    <TextField 
                        value={formik.values.cargo} 
                        name="cargo" 
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Nome do Cargo"
                        className={classes.cargo}
                        helperText={formik.errors.cargo} />

                    <ColorButtonSave variant="contained" size="small" color="primary" type="submit" disabled={!formik.isValid}>Gravar</ColorButtonSave>
                    <ColorButtonDelete variant="contained" color="primary" type="button" onClick={deleteRecord} >Excluir</ColorButtonDelete>
                    
                    
                </div>
                </form>
            </DialogContent>
    </Dialog>

        );
    };

    const Sidebar = () => {
        return (
        <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text">
            <Button onClick={newRecord}>Novo Cargo</Button>
            <Button onClick={deleteRecord}>Excluir Cargo</Button>
            <Button onClick={navegar}>Menu</Button>
        </ButtonGroup>
        );
    }

    const Content = () =>{
        return (
            <Fragment>        
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="error">
            {errorData}
            </Alert>
            </Snackbar>

            {Dialogo()}

            <div className={classes.box}>
                <Paper className={classes.boxPrancheta} elevation={7}>
                <div className={classes.boxDataGrid}>
                    <DataGrid rows={list} 
                        disableColumnMenu 
                        disableColumnReorder
                        onRowSelected={(newSelection) => {
                            inserir = false;
                            setSelection(newSelection.data);
                            console.log("Selecao");
                            console.log(newSelection.data);
                            console.log("SetSelecao");
                            console.log(selection);
                            formik.setFieldValue('cargo', newSelection.data.car_nome);
                            setOpenDialog(true);
                        }}    
                        components={{
                            Toolbar: GridToolbar,
                        }}                                          
                        columns={[
                        { field: 'id', headerName: 'Column 1', headerClassName: 'header_grid', headerAlign: 'center', width: 150, hide: true },
                        { field: 'car_id', headerName: 'ID', headerClassName: 'header_grid', type: 'number', headerAlign: 'center', width: 80, sortable: false },
                        { field: 'car_nome', headerName: 'Nome', headerClassName: 'header_grid', type: 'string', headerAlign: 'center', flex: 1 }
                    ]} />                
                </div>
                </Paper>
            </div>
        </Fragment>

        );

    }

    return(
        <Fragment>
            <CssBaseline />
            <Pagina Sidebar={Sidebar()} Content={Content()} Breadcrumb={Breadcrumb()} authState={authState} msg={msg}  />
        </Fragment>
    );
}
