import React, { Fragment } from 'react';

import Cabecalho from '../Cabecalho/Cabecalho';
import Rodape from '../Rodape/Rodape';
import { AuthContext } from "../../App";

export default function MenuPrincipal() {
  const { state: authState } = React.useContext(AuthContext);

  return(
    <Fragment>
      <Cabecalho name={authState.name} />
      <Rodape />
    </Fragment>
  );

/*  return(
    <Fragment>
      <MenuOpcoes />
    </Fragment>
  );*/


}
