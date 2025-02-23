import React, { useState } from 'react';
import Login from './components/Login/Login';
import Rotas from './components/Rotas/Rotas';
import axios from 'axios';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


/*
https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
*/
//const authentication = { auth: false, token: '', name : ''};

export const AuthContext = React.createContext();
const initialState = {
  name: null,
  expiresIn: 0,
  auth: false,
  token: null,
  message: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("expiresIn", JSON.stringify(action.payload.expiresIn));      
      localStorage.setItem("auth", action.payload.auth);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("message", action.payload.message);
      console.log("Entrou no Login: " + JSON.stringify(action.payload)) 
      return {
        ...state,
        name: action.payload.name,
        expiresIn: action.payload.expiresIn,
        auth: action.payload.auth,
        token: action.payload.token,
        message: action.payload.message
      
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        name: null,
        expiresIn: 0,
        auth: null,
        token: null,
        message: null
      };
    default:
      return state;
  }
};




axios.interceptors.request.use(async (config) => {
  console.log("Axios");
  console.log(config);
  
  let token = localStorage.getItem("token");
  if (localStorage.getItem("token")) {
    config.headers['Authorization'] =  token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
      <div className="App">{!state.auth ? <Login /> : <Rotas />}</div>
    </AuthContext.Provider>
  );    
}

export default App;