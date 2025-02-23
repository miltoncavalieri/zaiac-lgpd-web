import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuPrincipal from '../MenuPrincipal/MenuPrincipal';
import Login from '../Login/Login';
import Cargo from '../Administracao/Cargo/Cargo';

export default function Rotas() {
  return(
      <Router>
        <Switch>
          <Route exact path="/" component={MenuPrincipal} />
          <Route exact path="/cargo" component={Cargo} />
          <Route path='*' component={Login} />
        </Switch>
      </Router>
  );
}
