import React from 'react';
import './Rodape.css';

export default function Rodape(props) {
    const msg = 'Teste de MSG';
    return (
        <div className="rodape">
            <p>{props.msg} mais isto</p>
        </div>


    )
}