import React, { Fragment } from 'react';
import Cabecalho from '../Cabecalho/Cabecalho';
import Rodape from '../Rodape/Rodape';
import CssBaseline from '@material-ui/core/CssBaseline';
/*import './Template.css';*/
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import MenuOpcoes2 from '../MenuOpcoes/MenuOpcoes2'





const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      width: '100vw',
/*      border: '5px solid black',*/
'background-image': 'linear-gradient(#d0d3d4 , white)',
    },
    main_grid: {
        display: 'grid',
        'grid-template-columns': 'auto 1fr',
        'grid-template-rows' : '100px 1fr 30px',
        width: '100%',
        'grid-gap': '10px',
    },
    header: {
        'grid-column' : 'span 2',
/*        border: '5px solid green',*/
        padding: '8px',
    },
    footer: {
        'grid-column' : 'span 2',
/*        border: '5px solid yellow',*/
    },
    sideBar: {
        width: 'auto',
/*        border: '1px solid green',*/
        padding: '8px',
    },
    content: {
        width: '1fr',
        display: 'flex',
/*        border: '1px solid cyan',*/
        justifyContent: 'center',
        alignContent: 'center', 
        height: '100%',
    },
    paper: {
/*      margin: theme.spacing(8, 4),*/
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

  

export function Pagina({Sidebar, Content, Breadcrumb, authState, msg}) {
    const classes = useStyles();

    
    return (
        <Grid container component="main" className={classes.root} spacing={3}>
            <div className={classes.main_grid}>
                <div className={classes.header}>
                        <Cabecalho name={authState.name} breadcrumb={Breadcrumb} />
                </div>
                <div className={classes.sideBar}>
                    <Paper className={classes.paper}>
                        <MenuOpcoes2 />
                    </Paper>
                </div>
                <div className={classes.content}>
                        {Content}
                </div>
                <div className={classes.footer}>
                    <Paper className={classes.paper}>
                        Footer
                    </Paper>
                </div>
            </div>
        </Grid>
    );
}