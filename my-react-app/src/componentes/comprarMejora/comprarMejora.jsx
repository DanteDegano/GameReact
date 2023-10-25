import React, { Component } from 'react';
import { MyContext } from "../../context/context";

class CompraComponent extends Component {
  static contextType = MyContext; // Establece el contexto para este componente

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

      // Accede al contexto a través de this.context
      const { valor, setValor } = this.context;
      setValor(nuevoValorConAumento);
      console.log( 'EnComprar Mejora.jsx' + nuevoValorConAumento) 
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
