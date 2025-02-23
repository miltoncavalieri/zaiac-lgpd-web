import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/images/lgpd-login.jpg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AuthContext } from "../../App";
import { useFormik } from 'formik';
import LoginService, { loginUser } from '../../services/LoginService';
import Snackbar from '@material-ui/core/Snackbar';


import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function Login() {
    const classes = useStyles();

    const { dispatch } = React.useContext(AuthContext);
    const [errorData, setErrorData] = React.useState("");
    const [open, setOpen] = React.useState(false);


    const formik = useFormik({
        initialValues: { username: '', password: '', msg : '' },
        validate: (values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Obrigatório';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          ) {
            errors.username = 'E-mail invalido';
          }
          if(!values.password) {
            errors.password = 'Obrigatório';
          } else if (values.password.length < 5) {
            errors.password = 'Numero de caracteres invalidos para senha';

          }
          return errors;
        },
        onSubmit : (values, { setSubmitting }) => {
          console.log("handleFormSubmit: " + JSON.stringify(values));
          const auth = {username: values.username, password: values.password}

          loginUser(auth, setErrorData)
              .then(resJson => {
                console.log("Para dispatcher: " + JSON.stringify(resJson));
                dispatch({type: 'LOGIN', payload: resJson})
              })
              .catch(error => {
                if (error.status == 401) {
                  setOpen(true);
                  setErrorData("Erro de autenticacao");
                  console.log("(1)");
                } else {                  
                  setErrorData(error.statusText);
                  setErrorData("Error");

                  console.log("(2) " + error);
                }
              });
        },
      });  
/*      console.log("Formik " ,formik);*/

      const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
      };
      
      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }      

    return (      
      <Grid container component="main" className={classes.root}>
          <CssBaseline />
          
          <Grid item xs={false} sm={4} md={7} className={classes.image} />

          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar}>
              <Alert onClose={handleCloseSnackBar} severity="error">
                {errorData}
              </Alert>
              </Snackbar>

              <form onSubmit={formik.handleSubmit} className={classes.form}>

                <TextField 
                    value={formik.values.username} 
                    name="username" 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    autoComplete="false"
                    type="text" 
                    label="Username"
                    error={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.username} 
                    autoFocus
                />

                <TextField 
                    type="password" 
                    name="password" 
                    id="password"
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.password} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    helperText={formik.errors.password}
                />
                
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button variant="outlined" 
                  color="primary" 
                  fullWidth
                  type="submit" disabled={!formik.isValid}
                  className={classes.submit}>Login
                  
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>                                
              </form>

            </div>
          </Grid>
    </Grid>
    );
      
}

//Login.propTypes = {
//    setToken: PropTypes.func.isRequired
//}

export default Login;