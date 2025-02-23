import React, {useContext} from 'react';
import MenuOpcoes from '../MenuOpcoes/MenuOpcoes';
import LogoZaiac from '../../assets/images/Company_92x80.png';
import LogoLGPD from '../../assets/images/Lgpd.png';
import { makeStyles } from '@material-ui/core/styles';


//import Typography from '@material-ui/core/Typography';
//import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Link from '@material-ui/core/Link';
//import HomeIcon from '@material-ui/icons/Home';
//import WhatshotIcon from '@material-ui/icons/Whatshot';
//import GrainIcon from '@material-ui/icons/Grain';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        width: '100%',
        'grid-template-columns': '150px 1fr 100px',
        'backgroundColor' : 'transparent',
/*        'border': '1px solid yellow',*/
    },
    image_lgpd: {
        width: '100%',
        height: '70%;',
    },
    detail: {
        display: 'grid',
        'grid-template-columns': '1fr 1fr',
        'grid-template-rows': 'auto',
        'backgroundColor' : 'transparent',
        
    },
    operator: {
        display: 'flex',
        'justify-content': 'flex-start',
        'text-shadow': '2px 2px 8px #003366',
        paddingTop: '10px',
        fontSize: '150%',
    },
    menuOpcoes: {
        display: 'flex',
        'justify-content': 'flex-end',
        'vertical-align': 'text-bottom',
    },    
  }));



export default function Cabecalho(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
                <img className={classes.image_lgpd} src={LogoLGPD} alt="" />
            </div>
            <div className={classes.detail}>
                <div style={{'padding': '10px'}}>
                    {props.breadcrumb}
                    
                </div >
                <div className={classes.operator}>Operador: {props.name}</div>
                <div className={classes.menuOpcoes}>

                </div>
            </div>
            <div>
                <img className="img-zaiac" src={LogoZaiac} alt="" />
            </div>
        </div>
    );
}
