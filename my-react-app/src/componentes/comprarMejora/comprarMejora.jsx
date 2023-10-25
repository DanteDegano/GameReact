import React, { Component } from 'react';

class CompraComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valor: 100,
    };

    this.comprar = this.comprar.bind(this);
  }

  comprar() {
    this.setState((prevState) => {
      const nuevoValor = prevState.valor - 1;
      const nuevoValorConAumento = Math.floor(nuevoValor * 1.05);
      return { valor: nuevoValorConAumento };
    });
  }

  render() {
    return (
      <div>
        <p>Valor: {this.state.valor.toFixed(0)}</p>
        <button onClick={this.comprar}>Comprar</button>
      </div>
    );
  }
}

export default CompraComponent;
