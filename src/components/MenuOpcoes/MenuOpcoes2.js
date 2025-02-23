import React from 'react';
import { Menubar } from 'primereact/menubar';
import { AuthContext } from "../../App";
import { useHistory } from "react-router-dom";

export default function MenuOpcoes() {
  let history = useHistory();
  const { dispatch } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigateToPage = (path) => {
    console.log('Navigate to path ' + path);
    history.push(path);
  }


    const itemsAdministracao = [
        {
            icon: 'pi pi-fw pi-sitemap',
            items: [
                {
                    label: 'Usuário',
                    icon: 'pi pi-fw pi-user',
                },
                {
                  label: 'LGPD',
                  icon: 'pi pi-fw pi-eye-slash',
                },
                {
                  label: 'Empresas',
                  icon: 'pi pi-fw pi-map',
                    items: [
                        {
                            label: 'Cadastro',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Cargos',
                            icon: 'pi pi-fw pi-book',
                            command:()=>{navigateToPage('/cargo')}
                        },
                        {
                          label: 'Controle de senhas',
                          icon: 'pi pi-fw pi-key'
                      }
                    ]
                },
                {
                    label: 'Origens',
                    icon: 'pi pi-fw pi-inbox'
                },
                {
                    label: 'Tipo Solicitação',
                    icon: 'pi pi-fw pi-sliders-v'
                },
                {
                  separator: true
                },
                {
                  label: 'Funcionalidades',
                  icon: 'pi pi-fw pi-window-minimize'
              },
              {
                label: 'Grupo Acesso',
                icon: 'pi pi-fw pi-unlock'
            }


            ]
        }
    ];

    const itemsSolicitacao = [
        {
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Associação',
                    icon: 'pi pi-fw pi-sign-in'
                },
                {
                    label: 'Solicitação',
                    icon: 'pi pi-fw pi-paperclip'
                },
            ]
        },
    ];

    const itemsTrocaSenha = [
        {
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Outro usuario',
                    icon: 'pi pi-fw pi-users',

                },
                {
                    label: 'Meu usuário',
                    icon: 'pi pi-fw pi-unlock',

                },
            ]
        }
    ];

    const itemsLogoff = [
        {
            icon: 'pi pi-fw pi-power-off',
            command: ()=> {
              setAnchorEl(null);
              dispatch({type: 'LOGOUT'});
            }
        }
    ];

   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const logOut = () => {
    setAnchorEl(null);
    dispatch({type: 'LOGOUT'});
  }
  
 
   const handleClose = () => {
     setAnchorEl(null);
   };

   const cargo = () => {
    setAnchorEl(null);
    history.push("/cargo");

   }
   return (
        <div className="card">
            <Menubar model={itemsAdministracao}/>
            <Menubar model={itemsSolicitacao}/>
            <Menubar model={itemsTrocaSenha}/>
            <Menubar model={itemsLogoff}/>
        </div>
   );
}
