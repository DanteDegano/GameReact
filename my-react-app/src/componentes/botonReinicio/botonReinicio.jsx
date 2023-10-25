import React from 'react';

const BotonReinicio = ({ reiniciarContador, canReset }) => {
    return (
        <button onClick={reiniciarContador} disabled={canReset}>
            REINICIAR TODO
        </button>
    );
};

export default BotonReinicio;

