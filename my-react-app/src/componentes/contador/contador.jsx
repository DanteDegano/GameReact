import React, { Component } from 'react';
import BotonReinicio from '../botonReinicio/botonReinicio';
import { MyContext } from "../../context/context";

class Contador extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    const contadorGuardado = localStorage.getItem('contador');
    const velocidadGuardada = localStorage.getItem('velocidad');

    this.state = {
      contador: contadorGuardado ? parseFloat(contadorGuardado) : 0,
      velocidad: velocidadGuardada ? parseFloat(velocidadGuardada) : 1000,
      resetCost: 50,
      canReset: false,
      shouldAccelerate: true,
    };

    this.reiniciarYAcelerarContador = this.reiniciarYAcelerarContador.bind(this);
    this.reiniciarYSinAcelerar = this.reiniciarYSinAcelerar.bind(this);
    this.iniciarIntervalo = this.iniciarIntervalo.bind(this);
    this.retirarIngresos = this.retirarIngresos.bind(this);
  }

  componentDidMount() {
    this.iniciarIntervalo();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  iniciarIntervalo() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        const nuevoContador = prevState.contador + 1;
        localStorage.setItem('contador', nuevoContador.toString());
        localStorage.setItem('velocidad', this.state.velocidad.toString());
        return { contador: nuevoContador };
      });

      if (!this.state.canReset && this.state.contador >= this.state.resetCost) {
        this.setState({ canReset: true });
      }
    }, this.state.velocidad);
  }

  formatearContador() {
    const { contador } = this.state;
    if (contador >= 1e12) {
      return (contador / 1e12).toFixed(2) + 'T';
    } else if (contador >= 1e9) {
      return (contador / 1e9).toFixed(2) + 'B';
    } else if (contador >= 1e6) {
      return (contador / 1e6).toFixed(2) + 'M';
    } else if (contador >= 1e3) {
      return (contador / 1e3).toFixed(2) + 'K';
    }
    
    return contador;
  }

  reiniciarYAcelerarContador() {
    if (this.state.canReset) {
      this.setState(
        { contador: 0, velocidad: this.state.velocidad * 0.25, resetCost: this.state.resetCost * 2, canReset: false, shouldAccelerate: true },
        this.iniciarIntervalo
      );
      localStorage.setItem('contador', '0');
      localStorage.setItem('velocidad', this.state.velocidad * 0.005);
    }
  }

  reiniciarYSinAcelerar() {
    const velocidadBase = 1000;
    this.setState(
      { contador: 0, velocidad: velocidadBase, canReset: false, shouldAccelerate: false },
      () => {
        localStorage.setItem('contador', '0');
        localStorage.setItem('velocidad', velocidadBase.toString());
        this.iniciarIntervalo();
      }
    );
  }

  retirarIngresos() {
    const { valor } = this.context;
    if (this.state.contador >= valor) {  // Verifica si el contador es mayor o igual al valor
      const nuevoContador = this.state.contador - valor;
      this.setState({ contador: nuevoContador });
      localStorage.setItem('contador', nuevoContador.toString());
      console.log('Se retiraron: $' + valor )
    }
  }

  render() {
    const contadorFormateado = this.formatearContador();
    const { valor } = this.context;

    return (
      <div>
        <p>Contador: {contadorFormateado}</p>
        <BotonReinicio reiniciarContador={this.reiniciarYSinAcelerar} />
        <button onClick={this.reiniciarYAcelerarContador} disabled={!this.state.canReset}> 
          Reiniciar y Acelerar
        </button>
        <button onClick={this.retirarIngresos} disabled={this.state.contador < valor || valor > this.state.contador}> 
          Retirar Ingresos
        </button>
      </div>
    );
  }
}

export default Contador;
